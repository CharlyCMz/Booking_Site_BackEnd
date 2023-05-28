import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rol } from './entities/rol.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, User])],
  controllers: [],
  providers: [],
})
export class UsersModule {}
