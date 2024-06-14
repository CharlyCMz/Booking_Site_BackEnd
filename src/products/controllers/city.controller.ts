import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CityService } from '../services/city.service';
import { CreateCityDTO, UpdateCityDTO } from '../dtos/city.dto';

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) {}

  //Category addition "Create"
  @Post()
  createEntity(@Body() payload: CreateCityDTO) {
    return this.cityService.createEntity(payload);
  }

  //Listing all categories "Read"
  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  //Searching for one category "Read"
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.findOne(id);
  }

  // Category modification "Update"
  @Put(':id')
  updateEntity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCityDTO,
  ) {
    return this.cityService.updateEndity(id, payload);
  }

  //Category Elimination "Delete"
  @Delete(':id')
  deleteEntity(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.deleteEntity(id);
  }
}
