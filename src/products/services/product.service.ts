import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';
import { CategoryService } from './category.service';
import { CityService } from './city.service';
import { FeatureService } from './feature.service';
import { PolicyService } from './policy.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
    private cityService: CityService,
    private featureService: FeatureService,
    private policyService: PolicyService,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['city', 'category', 'images', 'policies', 'features'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('product.city', 'city')
      .leftJoinAndSelect('product.policies', 'policy')
      .leftJoinAndSelect('product.features', 'feature')
      .where('product.id = :id', { id })
      .getOne();
    if (!product) {
      throw new NotFoundException(`The Product with ID: ${id} was Not Found`);
    }
    return product;
  }

  async createEntity(payload: CreateProductDTO) {
    try {
      const newProduct = await this.productRepository.create(payload);
      const category = await this.categoryService.findOne(payload.categoryId);
      newProduct.category = category;
      const city = await this.cityService.findOne(payload.cityId);
      newProduct.city = city;
      const features = await this.featureService.filterByIds(
        payload.featureIds,
      );
      newProduct.features = features;
      const policies = await this.policyService.filterByIds(payload.policyIds);
      newProduct.policies = policies;
      return await this.productRepository.save(newProduct);
    } catch (error) {
      console.log(error.driverError);
      if (error instanceof QueryFailedError) {
        //error.driverError === '23505'
        throw new HttpException(
          'Product name already in use',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
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
    if (payload.featureIds) {
      const features = await this.featureService.filterByIds(
        payload.featureIds,
      );
      product.features = features;
    }
    if (payload.policyIds) {
      const policies = await this.policyService.filterByIds(payload.policyIds);
      product.policies = policies;
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
