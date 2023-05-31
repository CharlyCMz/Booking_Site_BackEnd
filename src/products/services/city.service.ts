import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from '../entities/city.entity';
import { Repository } from 'typeorm';
import { CreateCityDTO, UpdateCityDTO } from '../dtos/city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  findAll() {
    return this.cityRepository.find();
  }

  async findOne(id: number) {
    const city = await this.cityRepository.findOneBy({ id });
    if (!city) {
      throw new NotFoundException(`The City with ID: ${id} was Not Found`);
    }
    return city;
  }

  createEntity(payload: CreateCityDTO) {
    //Create Method from the Repository builds an instance with the payload data =)
    const newCity = this.cityRepository.create(payload);
    //But only the Save Method can store it in the DataBase
    return this.cityRepository.save(newCity);
  }

  async updateEndity(id: number, payload: UpdateCityDTO) {
    const city = await this.cityRepository.findOneBy({ id });
    if (!city) {
      throw new NotFoundException(`The City with ID: ${id} was Not Found`);
    }
    //Merge Method can combine the differences found
    this.cityRepository.merge(city, payload);
    return this.cityRepository.save(city);
  }

  async deleteEntity(id: number) {
    const exist = await this.cityRepository.findOneBy({ id });
    if (!exist) {
      throw new NotFoundException(`The City with ID: ${id} was Not Found`);
    }
    return this.cityRepository.delete(id);
  }
}
