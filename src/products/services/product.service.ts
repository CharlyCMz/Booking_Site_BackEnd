import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';
import { CategoryService } from './category.service';
import { CityService } from './city.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
    private cityService: CityService,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['city', 'category', 'images', 'policies'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('product.city', 'city')
      .leftJoinAndSelect('product.policies', 'policy')
      .where('product.id = :id', { id })
      .getOne();
    if (!product) {
      throw new NotFoundException(`The Product with ID: ${id} was Not Found`);
    }
    return product;
  }

  async createEntity(payload: CreateProductDTO) {
    const newProduct = this.productRepository.create(payload);
    const category = await this.categoryService.findOne(payload.categoryId);
    newProduct.category = category;
    const city = await this.cityService.findOne(payload.cityId);
    newProduct.city = city;
    return this.productRepository.save(newProduct);
  }

  async updateEndity(id: number, payload: UpdateProductDTO) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`The Product with ID: ${id} was Not Found`);
    }
    if (payload.categoryId) {
      const category = await this.categoryService.findOne(payload.categoryId);
      product.category = category;
    }
    if (payload.cityId) {
      const city = await this.cityService.findOne(payload.cityId);
      product.city = city;
    }
    //Merge Method can combine the differences found
    this.productRepository.merge(product, payload);
    return this.productRepository.save(product);
  }

  async deleteEntity(id: number) {
    const exist = await this.productRepository.findOneBy({ id });
    if (!exist) {
      throw new NotFoundException(`The Policy with ID: ${id} was Not Found`);
    }
    return this.productRepository.delete(id);
  }
}
