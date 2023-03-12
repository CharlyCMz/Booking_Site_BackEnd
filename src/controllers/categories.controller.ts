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
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  //Injection of Service
  constructor(private categoryService: CategoriesService) {}

  //Category addition "Create"
  @Post()
  createEntity(@Body() payload: any) {
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

  //Category modification "Update"
  @Put(':id')
  updateEntity(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return this.categoryService.updateEndity(+id, payload);
  }

  //Category Elimination "Delete"
  @Delete(':id')
  deleteEntity(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteEntity(id);
  }
}
