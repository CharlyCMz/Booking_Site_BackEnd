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
import { PolicyTypeService } from '../services/policy-type.service';
import {
  CreatePolicyTypeDTO,
  UpdatePolicyTypeDTO,
} from '../dtos/policyType.dto';

@Controller('policy-type')
export class PolicyTypeController {
  //Injection of Service
  constructor(private policyTypeService: PolicyTypeService) {}

  //Category addition "Create"
  @Post()
  createEntity(@Body() payload: CreatePolicyTypeDTO) {
    return this.policyTypeService.createEntity(payload);
  }

  //Listing all categories "Read"
  @Get()
  findAll() {
    return this.policyTypeService.findAll();
  }

  //Searching for one category "Read"
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.policyTypeService.findOne(id);
  }

  // Category modification "Update"
  @Put(':id')
  updateEntity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePolicyTypeDTO,
  ) {
    return this.policyTypeService.updateEndity(id, payload);
  }

  //Category Elimination "Delete"
  @Delete(':id')
  deleteEntity(@Param('id', ParseIntPipe) id: number) {
    return this.policyTypeService.deleteEntity(id);
  }
}
