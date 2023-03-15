import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'src/config';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'Postgres',
      useFactory: (configFile: ConfigType<typeof config>) => {
        const client = new Client({
          database: configFile.database.name,
          user: configFile.database.user,
          password: configFile.database.password,
          port: configFile.database.port,
          host: configFile.database.host,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['Postgres'],
})
export class DatabaseModule {}
