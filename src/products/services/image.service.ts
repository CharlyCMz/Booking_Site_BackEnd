import { Injectable, NotFoundException } from '@nestjs/common';
import { Image } from '../entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDTO, UpdateImageDTO } from '../dtos/image.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  findAll() {
    return this.imageRepository.find();
  }

  async findOne(id: number) {
    const image = await this.imageRepository.findOneBy({ id });
    if (!image) {
      throw new NotFoundException(`The Image with ID: ${id} was Not Found`);
    }
    return image;
  }

  createEntity(payload: CreateImageDTO) {
    //Create Method from the Repository builds an instance with the payload data =)
    const newImage = this.imageRepository.create(payload);
    //But only the Save Method can store it in the DataBase
    return this.imageRepository.save(newImage);
  }

  async updateEndity(id: number, payload: UpdateImageDTO) {
    const image = await this.imageRepository.findOneBy({ id });
    if (!image) {
      throw new NotFoundException(`The Image with ID: ${id} was Not Found`);
    }
    //Merge Method can combine the differences found
    this.imageRepository.merge(image, payload);
    return this.imageRepository.save(image);
  }

  async deleteEntity(id: number) {
    const exist = await this.imageRepository.findOneBy({ id });
    if (!exist) {
      throw new NotFoundException(`The Image with ID: ${id} was Not Found`);
    }
    return this.imageRepository.delete(id);
  }
}
