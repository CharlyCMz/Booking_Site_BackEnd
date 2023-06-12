import { Injectable, NotFoundException } from '@nestjs/common';
import { Rol } from '../entities/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDTO, UpdateRolDTO } from '../dtos/rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  findAll() {
    return this.rolRepository.find({
      relations: ['users'],
    });
  }

  async findOne(id: number) {
    const rol = await this.rolRepository
      .createQueryBuilder('rol')
      .leftJoinAndSelect('rol.users', 'user')
      .where('rol.id = :id', { id })
      .getOne();
    if (!rol) {
      throw new NotFoundException(`The Rol with ID: ${id} was Not Found`);
    }
    return rol;
  }

  createEntity(payload: CreateRolDTO) {
    const newRol = this.rolRepository.create(payload);
    return this.rolRepository.save(newRol);
  }

  async updateEndity(id: number, payload: UpdateRolDTO) {
    const rol = await this.rolRepository.findOneBy({ id });
    if (!rol) {
      throw new NotFoundException(`The Rol with ID: ${id} was Not Found`);
    }
    //Merge Method can combine the differences found
    this.rolRepository.merge(rol, payload);
    return this.rolRepository.save(rol);
  }

  async deleteEntity(id: number) {
    const exist = await this.rolRepository.findOneBy({ id });
    if (!exist) {
      throw new NotFoundException(`The Rol with ID: ${id} was Not Found`);
    }
    return this.rolRepository.delete(id);
  }
}
