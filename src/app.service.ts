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
    return `Hello World! ... ${this.configFile.database.name}`;
  }

  getConection() {
    return new Promise((resolve, reject) => {
      this.pgClient.query('SELECT * FROM test_table', (err, res) => {
        if (err) {
          reject(err);
          console.log(err);
        }
        resolve(res.rows);
        console.log(res.rows);
      });
    });
  }
}
