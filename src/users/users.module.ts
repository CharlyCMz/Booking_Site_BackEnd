import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rol } from './entities/rol.entity';
import { User } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { RolesController } from './controllers/roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, User])],
  controllers: [UsersController, RolesController],
  providers: [],
})
export class UsersModule {}
