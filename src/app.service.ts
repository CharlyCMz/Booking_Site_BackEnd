import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configFile: ConfigType<typeof config>,
    @Inject('Postgres') private pgClient: Client,
  ) {}

  getHello(): string {
    return `Conection Succesfully Established with Booking_Side_BackEnd`;
  }
}
