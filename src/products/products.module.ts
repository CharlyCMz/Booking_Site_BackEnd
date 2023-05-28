import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';
import { City } from './entities/city.entity';
import { Feature } from './entities/feature.entity';
import { Image } from './entities/image.entity';
import { Policy } from './entities/policy.entity';
import { PolicyType } from './entities/policyType.entity';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      City,
      Feature,
      Image,
      Policy,
      PolicyType,
      Product,
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class ProductsModule {}
