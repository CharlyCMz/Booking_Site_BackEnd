import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rol } from './entities/rol.entity';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { RolController } from './controllers/rol.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, User])],
  controllers: [UserController, RolController],
  providers: [],
})
export class UsersModule {}
