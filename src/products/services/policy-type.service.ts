import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PolicyType } from '../entities/policyType.entity';
import { Repository } from 'typeorm';
import {
  CreatePolicyTypeDTO,
  UpdatePolicyTypeDTO,
} from '../dtos/policyType.dto';

@Injectable()
export class PolicyTypeService {
  constructor(
    @InjectRepository(PolicyType)
    private policyTypeRepository: Repository<PolicyType>,
  ) {}

  findAll() {
    return this.policyTypeRepository.find();
  }

  async findOne(id: number) {
    const policyType = await this.policyTypeRepository.findOneBy({ id });
    if (!policyType) {
      throw new NotFoundException(
        `The PolicyType with ID: ${id} was Not Found`,
      );
    }
    return policyType;
  }

  createEntity(payload: CreatePolicyTypeDTO) {
    //Create Method from the Repository builds an instance with the payload data =)
    const newPolicyType = this.policyTypeRepository.create(payload);
    //But only the Save Method can store it in the DataBase
    return this.policyTypeRepository.save(newPolicyType);
  }

  async updateEndity(id: number, payload: UpdatePolicyTypeDTO) {
    const policyType = await this.policyTypeRepository.findOneBy({ id });
    if (!policyType) {
      throw new NotFoundException(
        `The PolicyType with ID: ${id} was Not Found`,
      );
    }
    //Merge Method can combine the differences found
    this.policyTypeRepository.merge(policyType, payload);
    return this.policyTypeRepository.save(policyType);
  }

  async deleteEntity(id: number) {
    const exist = await this.policyTypeRepository.findOneBy({ id });
    if (!exist) {
      throw new NotFoundException(
        `The PolicyType with ID: ${id} was Not Found`,
      );
    }
    return this.policyTypeRepository.delete(id);
  }
}
