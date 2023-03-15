import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configFile: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    return `Hello World! ... ${this.configFile.database.name}`;
  }
}
