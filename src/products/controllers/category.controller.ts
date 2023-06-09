import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from 'src/products/dtos/category.dto';

@Controller('category')
export class CategoryController {
  //Injection of Service
  constructor(private categoryService: CategoryService) {}

  //Category addition "Create"
  @Post()
  createEntity(@Body() payload: CreateCategoryDTO) {
    return this.categoryService.createEntity(payload);
  }

  //Listing all categories "Read"
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  //Searching for one category "Read"
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  // Category modification "Update"
  @Put(':id')
  updateEntity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDTO,
  ) {
    return this.categoryService.updateEndity(id, payload);
  }

  //Category Elimination "Delete"
  @Delete(':id')
  deleteEntity(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteEntity(id);
  }
}
