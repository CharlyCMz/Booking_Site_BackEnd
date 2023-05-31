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
import { ImageService } from '../services/image.service';
import { CreateImageDTO, UpdateImageDTO } from '../dtos/image.dto';

@Controller('image')
export class ImageController {
  //Injection of Service
  constructor(private imageService: ImageService) {}

  //Category addition "Create"
  @Post()
  createEntity(@Body() payload: CreateImageDTO) {
    return this.imageService.createEntity(payload);
  }

  //Listing all categories "Read"
  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  //Searching for one category "Read"
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.findOne(id);
  }

  // Category modification "Update"
  @Put(':id')
  updateEntity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateImageDTO,
  ) {
    return this.imageService.updateEndity(id, payload);
  }

  //Category Elimination "Delete"
  @Delete(':id')
  deleteEntity(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.deleteEntity(id);
  }
}
