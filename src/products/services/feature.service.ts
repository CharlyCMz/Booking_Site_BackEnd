import { Injectable, NotFoundException } from '@nestjs/common';
import { Feature } from '../entities/feature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeatureDTO, UpdateFeatureDTO } from '../dtos/feature.dto';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
  ) {}

  findAll() {
    return this.featureRepository.find();
  }

  async findOne(id: number) {
    const feature = await this.featureRepository.findOneBy({ id });
    if (!feature) {
      throw new NotFoundException(`The Feature with ID: ${id} was Not Found`);
    }
    return feature;
  }

  async filterByIds(list: number[]): Promise<Feature[]> {
    return await this.featureRepository
      .createQueryBuilder('feature')
      .where('feature.id IN (:...list)', { list })
      .getMany();
  }

  createEntity(payload: CreateFeatureDTO) {
    //Create Method from the Repository builds an instance with the payload data =)
    const newFeature = this.featureRepository.create(payload);
    //But only the Save Method can store it in the DataBase
    return this.featureRepository.save(newFeature);
  }

  async updateEndity(id: number, payload: UpdateFeatureDTO) {
    const feature = await this.featureRepository.findOneBy({ id });
    if (!feature) {
      throw new NotFoundException(`The Feature with ID: ${id} was Not Found`);
    }
    //Merge Method can combine the differences found
    this.featureRepository.merge(feature, payload);
    return this.featureRepository.save(feature);
  }

  async deleteEntity(id: number) {
    const exist = await this.featureRepository.findOneBy({ id });
    if (!exist) {
      throw new NotFoundException(`The Feature with ID: ${id} was Not Found`);
    }
    return this.featureRepository.delete(id);
  }
}
