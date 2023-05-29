import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rol } from './entities/rol.entity';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { RolController } from './controllers/rol.controller';
import { RolService } from './services/rol.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, User])],
  controllers: [UserController, RolController],
  providers: [RolService, UserService],
})
export class UsersModule {}
