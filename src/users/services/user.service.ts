import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import { RolService } from './rol.service';
import { PersonService } from './person.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolService: RolService,
    private personService: PersonService,
  ) {}

  findAll() {
    return this.userRepository.find({
      relations: ['rol'],
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rol', 'rol')
      .leftJoinAndSelect('user.person', 'person')
      .leftJoinAndSelect('person.idType', 'idType')
      .leftJoinAndSelect('person.address', 'address')
      .leftJoinAndSelect('address.location', 'location')
      .where('user.id like :id', { id })
      .getOne();
    if (!user) {
      throw new NotFoundException(`The User with ID: ${id} was Not Found`);
    }
    return user;
  }

  //TODO: Find User by document

  async createEntity(payload: CreateUserDTO) {
    const newUser = this.userRepository.create(payload);
    newUser.rol = await this.rolService.findOne(payload.rolId);
    newUser.person = await this.personService.findOne(payload.personId);
    return this.userRepository.save(newUser);
  }

  async updateEndity(id: string, payload: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`The User with ID: ${id} was Not Found`);
    }
    if (payload.rolId) {
      user.rol = await this.rolService.findOne(payload.rolId);
    }
    if (payload.personId) {
      user.person = await this.personService.findOne(payload.personId);
    }
    this.userRepository.merge(user, payload);
    return this.userRepository.save(user);
  }

  async deleteEntity(id: string) {
    const exist = await this.userRepository.findOneBy({ id });
    if (!exist) {
      throw new NotFoundException(`The User with ID: ${id} was Not Found`);
    }
    return this.userRepository.delete(id);
  }
}
