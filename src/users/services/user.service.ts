import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import { RolService } from './rol.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolService: RolService,
  ) {}

  findAll() {
    return this.userRepository.find({
      relations: ['rol'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rol', 'rol')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) {
      throw new NotFoundException(`The User with ID: ${id} was Not Found`);
    }
    return user;
  }

  async createEntity(payload: CreateUserDTO) {
    const newUser = this.userRepository.create(payload);
    const rol = await this.rolService.findOne(payload.rolId);
    newUser.rol = rol;
    return this.userRepository.save(newUser);
  }

  async updateEndity(id: string, payload: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`The User with ID: ${id} was Not Found`);
    }
    if (payload.rolId) {
      const rol = await this.rolService.findOne(payload.rolId);
      user.rol = rol;
    }
    //Merge Method can combine the differences found
    this.userRepository.merge(user, payload);
    return this.userRepository.save(user);
  }

  async deleteEntity(id: string) {
    const exist = await this.userRepository.findOneBy({ id });
    if (!exist) {
      throw new NotFoundException(`The Rol with ID: ${id} was Not Found`);
    }
    return this.userRepository.delete(id);
  }
}
