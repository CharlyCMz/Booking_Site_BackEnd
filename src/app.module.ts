import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    //Makes the .env file part of a global modul for injection (service.get())
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
