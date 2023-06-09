import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from 'src/products/dtos/category.dto';
import { ImageService } from './image.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private imageService: ImageService,
  ) {}

  findAll() {
    return this.categoryRepository.find({
      relations: ['image'],
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'product') // TODO: need to study this notation!!
      .leftJoinAndSelect('category.image', 'image')
      .where('category.id = :id', { id })
      .getOne();
    if (!category) {
      throw new NotFoundException(`The Category with ID: ${id} was Not Found`);
    }
    return category;
  }

  async createEntity(payload: CreateCategoryDTO) {
    //Create Method from the Repository builds an instance with the payload data =)
    const newCategory = await this.categoryRepository.create(payload);
    const asociatedImage = await this.imageService.findOne(payload.imageId);
    //Adds the Image info to the new Category created
    newCategory.image = asociatedImage;
    //But only the Save Method can store it in the DataBase
    return this.categoryRepository.save(newCategory);
  }

  async updateEndity(id: number, payload: UpdateCategoryDTO) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`The Category with ID: ${id} was Not Found`);
    }
    //Merge Method can combine the differences found
    this.categoryRepository.merge(category, payload);
    return this.categoryRepository.save(category);
  }

  async deleteEntity(id: number) {
    const exist = await this.categoryRepository.findOneBy({ id });
    if (!exist) {
      throw new NotFoundException(`The Category with ID: ${id} was Not Found`);
    }
    return this.categoryRepository.delete(id);
  }
}
