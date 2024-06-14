import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { Category } from './entities/category.entity';
import { City } from './entities/city.entity';
import { Feature } from './entities/feature.entity';
import { Image } from './entities/image.entity';
import { Policy } from './entities/policy.entity';
import { PolicyType } from './entities/policyType.entity';
import { Product } from './entities/product.entity';
import { CityController } from './controllers/city.controller';
import { FeatureController } from './controllers/feature.controller';
import { ImageController } from './controllers/image.controller';
import { PolicyController } from './controllers/policy.controller';
import { PolicyTypeController } from './controllers/policy-type.controller';
import { ProductController } from './controllers/product.controller';
import { CityService } from './services/city.service';
import { FeatureService } from './services/feature.service';
import { ImageService } from './services/image.service';
import { PolicyService } from './services/policy.service';
import { PolicyTypeService } from './services/policy-type.service';
import { ProductService } from './services/product.service';

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
  controllers: [
    CategoryController,
    CityController,
    FeatureController,
    ImageController,
    PolicyController,
    PolicyTypeController,
    ProductController,
  ],
  providers: [
    CategoryService,
    CityService,
    FeatureService,
    ImageService,
    PolicyService,
    PolicyTypeService,
    ProductService,
  ],
})
export class ProductsModule {}
