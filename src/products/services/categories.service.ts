import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'pg';

import { Category } from '../entities/category.entity';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from 'src/products/dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(@Inject('Postgres') private pgClient: Client) {}

  //manual incremental counter for id generation
  private counter = 3;
  //Memory array of categories to initial interactions
  private categories: Category[] = [
    {
      id: 1,
      title: 'Apartments',
      description: `asdasdasdasd`,
      image: 'akjsdhakjsdh',
    },
    {
      id: 2,
      title: 'Hotels',
      description: `asdasrasdasdasda`,
      image: 'akjsdhakjsdh',
    },
    {
      id: 3,
      title: 'Glampings',
      description: `qfqweffsdfsfasdfasdfasdf`,
      image: 'akjsdhakjsdh',
    },
  ];

  //Manual methods creation to manipulate the memory array
  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException(`The Category with ID: ${id} was Not Found`);
    }
    return category;
  }

  createEntity(payload: CreateCategoryDTO) {
    this.counter += 1;
    const newCategory: Category = {
      id: this.counter,
      ...payload,
    };
    this.categories.push(newCategory);
    return `The category was created with the id ${newCategory.id}`;
  }

  updateEndity(id: number, payload: UpdateCategoryDTO) {
    const category = this.findOne(id);
    if (!category) {
      throw new NotFoundException(`The Category with ID: ${id} was Not Found`);
    }
    const index = this.categories.findIndex((category) => category.id === id);
    this.categories[index] = {
      ...category,
      ...payload,
    };
    return `Category with ID: ${id} updated successfully`;
  }

  deleteEntity(id: number) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (!index) {
      throw new NotFoundException(`The Category with ID: ${id} was Not Found`);
    }
    this.categories.splice(index, 1);
    return `Category with ID: ${id} removed successfully`;
  }
}
