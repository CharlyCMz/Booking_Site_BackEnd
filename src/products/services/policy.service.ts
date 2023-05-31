import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Policy } from '../entities/policy.entity';
import { Repository } from 'typeorm';
import { CreatePolicyDTO, UpdatePolicyDTO } from '../dtos/policy.dto';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
  ) {}

  findAll() {
    return this.policyRepository.find();
  }

  async findOne(id: number) {
    const policy = await this.policyRepository.findOneBy({ id });
    if (!policy) {
      throw new NotFoundException(`The Policy with ID: ${id} was Not Found`);
    }
    return policy;
  }

  createEntity(payload: CreatePolicyDTO) {
    //Create Method from the Repository builds an instance with the payload data =)
    const newPolicy = this.policyRepository.create(payload);
    //But only the Save Method can store it in the DataBase
    return this.policyRepository.save(newPolicy);
  }

  async updateEndity(id: number, payload: UpdatePolicyDTO) {
    const policy = await this.policyRepository.findOneBy({ id });
    if (!policy) {
      throw new NotFoundException(`The Policy with ID: ${id} was Not Found`);
    }
    //Merge Method can combine the differences found
    this.policyRepository.merge(policy, payload);
    return this.policyRepository.save(policy);
  }

  async deleteEntity(id: number) {
    const exist = await this.policyRepository.findOneBy({ id });
    if (!exist) {
      throw new NotFoundException(`The Policy with ID: ${id} was Not Found`);
    }
    return this.policyRepository.delete(id);
  }
}
