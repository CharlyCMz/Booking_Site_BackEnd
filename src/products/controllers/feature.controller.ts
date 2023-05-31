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
import { FeatureService } from '../services/feature.service';
import { CreateFeatureDTO, UpdateFeatureDTO } from '../dtos/feature.dto';

@Controller('feature')
export class FeatureController {
  constructor(private featureService: FeatureService) {}

  //Category addition "Create"
  @Post()
  createEntity(@Body() payload: CreateFeatureDTO) {
    return this.featureService.createEntity(payload);
  }

  //Listing all categories "Read"
  @Get()
  findAll() {
    return this.featureService.findAll();
  }

  //Searching for one category "Read"
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.featureService.findOne(id);
  }

  // Category modification "Update"
  @Put(':id')
  updateEntity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateFeatureDTO,
  ) {
    return this.featureService.updateEndity(id, payload);
  }

  //Category Elimination "Delete"
  @Delete(':id')
  deleteEntity(@Param('id', ParseIntPipe) id: number) {
    return this.featureService.deleteEntity(id);
  }
}
