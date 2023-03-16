import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from 'src/products/dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`The Category with ID: ${id} was Not Found`);
    }
    return category;
  }

  createEntity(payload: CreateCategoryDTO) {
    //Create Method from the Repository builds an instance with the payload data =)
    const newCategory = this.categoryRepository.create(payload);
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
