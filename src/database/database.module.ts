import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configFile: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          host: configFile.database.host,
          port: configFile.database.port,
          username: configFile.database.user,
          password: configFile.database.password,
          database: configFile.database.name,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
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
  exports: ['Postgres', TypeOrmModule],
})
export class DatabaseModule {}
