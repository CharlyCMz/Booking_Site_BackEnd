import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rol } from './entities/rol.entity';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { RolController } from './controllers/rol.controller';
import { RolService } from './services/rol.service';
import { UserService } from './services/user.service';
import { LocationService } from './services/location.service';
import { PersonService } from './services/person.service';
import { AddressService } from './services/address.service';
import { IdTypeService } from './services/id-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, User])],
  controllers: [UserController, RolController],
  providers: [RolService, UserService, LocationService, PersonService, AddressService, IdTypeService],
})
export class UsersModule {}
