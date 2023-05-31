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
import { RolService } from '../services/rol.service';
import { CreateRolDTO, UpdateRolDTO } from '../dtos/rol.dto';

@Controller('rol')
export class RolController {
  //Injection of Service
  constructor(private rolService: RolService) {}

  //Category addition "Create"
  @Post()
  createEntity(@Body() payload: CreateRolDTO) {
    return this.rolService.createEntity(payload);
  }

  //Listing all categories "Read"
  @Get()
  findAll() {
    return this.rolService.findAll();
  }

  //Searching for one category "Read"
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolService.findOne(id);
  }

  // Category modification "Update"
  @Put(':id')
  updateEntity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRolDTO,
  ) {
    return this.rolService.updateEndity(id, payload);
  }

  //Category Elimination "Delete"
  @Delete(':id')
  deleteEntity(@Param('id', ParseIntPipe) id: number) {
    return this.rolService.deleteEntity(id);
  }
}
