import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

import { environment } from './config/environments';
import config from './config/config';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      envFilePath:
        environment[process.env.NODE_ENV] || './config/env/.development.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
