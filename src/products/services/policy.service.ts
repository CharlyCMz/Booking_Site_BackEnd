import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Policy } from '../entities/policy.entity';
import { Repository } from 'typeorm';
import { CreatePolicyDTO, UpdatePolicyDTO } from '../dtos/policy.dto';
import { PolicyTypeService } from './policy-type.service';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    private policyTypeService: PolicyTypeService,
  ) {}

  findAll() {
    return this.policyRepository.find({
      relations: ['policyType'],
    });
  }

  async findOne(id: number) {
    const policy = await this.policyRepository
      .createQueryBuilder('policy')
      .leftJoinAndSelect('policy.policyType', 'policyType')
      .where('policy.id = :id', { id })
      .getOne();
    if (!policy) {
      throw new NotFoundException(`The Policy with ID: ${id} was Not Found`);
    }
    return policy;
  }

  async filterByIds(list: number[]): Promise<Policy[]> {
    return await this.policyRepository
      .createQueryBuilder('policy')
      .where('policy.id IN (:...list)', { list })
      .getMany();
  }

  async createEntity(payload: CreatePolicyDTO) {
    //Create Method from the Repository builds an instance with the payload data =)
    const newPolicy = await this.policyRepository.create(payload);
    const policyType = await this.policyTypeService.findOne(
      payload.policyTypeId,
    );
    newPolicy.policyType = policyType;
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
