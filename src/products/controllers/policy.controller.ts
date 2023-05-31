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
import { PolicyService } from '../services/policy.service';
import { CreatePolicyDTO, UpdatePolicyDTO } from '../dtos/policy.dto';

@Controller('policy')
export class PolicyController {
  //Injection of Service
  constructor(private policyService: PolicyService) {}

  //Category addition "Create"
  @Post()
  createEntity(@Body() payload: CreatePolicyDTO) {
    return this.policyService.createEntity(payload);
  }

  //Listing all categories "Read"
  @Get()
  findAll() {
    return this.policyService.findAll();
  }

  //Searching for one category "Read"
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.policyService.findOne(id);
  }

  // Category modification "Update"
  @Put(':id')
  updateEntity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePolicyDTO,
  ) {
    return this.policyService.updateEndity(id, payload);
  }

  //Category Elimination "Delete"
  @Delete(':id')
  deleteEntity(@Param('id', ParseIntPipe) id: number) {
    return this.policyService.deleteEntity(id);
  }
}
