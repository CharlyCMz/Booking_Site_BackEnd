import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdType } from '../entities/id-type.entity';
import { Repository } from 'typeorm';
import { CreateIdTypeDTO, UpdateIdTypeDTO } from '../dtos/id-type.dto';

@Injectable()
export class IdTypeService {
  constructor(
    @InjectRepository(IdType)
    private idTypeRepository: Repository<IdType>,
  ) {}

  findAll() {
    return this.idTypeRepository.find();
  }
  async findOne(id: number) {
    const idType = await this.idTypeRepository
      .createQueryBuilder('idType')
      .where('idType.id = :id', { id })
      .getOne();
    if (!idType) {
      throw new NotFoundException(`The Id-Type with ID: ${id} was Not Found`);
    }
    return idType;
  }

  createEntity(payload: CreateIdTypeDTO) {
    const newIdType = this.idTypeRepository.create(payload);
    return this.idTypeRepository.save(newIdType);
  }

  async updateEndity(id: number, payload: UpdateIdTypeDTO) {
    const idType = await this.idTypeRepository.findOneBy({ id });
    if (!idType) {
      throw new NotFoundException(`The Id-Type with ID: ${id} was Not Found`);
    }
    this.idTypeRepository.merge(idType, payload);
    return this.idTypeRepository.save(idType);
  }

  async deleteEntity(id: number) {
    const exist = await this.idTypeRepository.findOneBy({ id });
    if (!exist) {
      throw new NotFoundException(`The Id-Type with ID: ${id} was Not Found`);
    }
    return this.idTypeRepository.delete(id);
  }
}
