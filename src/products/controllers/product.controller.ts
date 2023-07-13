import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';
import { QueryFailedError } from 'typeorm';

@Controller('product')
export class ProductController {
  //Injection of Service
  constructor(private productService: ProductService) {}

  //Category addition "Create"
  @Post()
  createEntity(@Body() payload: CreateProductDTO) {
    return this.productService.createEntity(payload);
  }

  //Listing all categories "Read"
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  //Searching for one category "Read"
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  // Category modification "Update"
  @Put(':id')
  updateEntity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productService.updateEndity(id, payload);
  }

  //Category Elimination "Delete"
  @Delete(':id')
  deleteEntity(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteEntity(id);
  }
}
