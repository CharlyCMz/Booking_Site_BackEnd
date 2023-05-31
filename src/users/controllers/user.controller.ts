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
import { UserService } from '../services/user.service';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';

@Controller('user')
export class UserController {
  //Injection of Service
  constructor(private userService: UserService) {}

  //Category addition "Create"
  @Post()
  createEntity(@Body() payload: CreateUserDTO) {
    return this.userService.createEntity(payload);
  }

  //Listing all categories "Read"
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  //Searching for one category "Read"
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // Category modification "Update"
  @Put(':id')
  updateEntity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDTO,
  ) {
    return this.userService.updateEndity(id, payload);
  }

  //Category Elimination "Delete"
  @Delete(':id')
  deleteEntity(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteEntity(id);
  }
}
