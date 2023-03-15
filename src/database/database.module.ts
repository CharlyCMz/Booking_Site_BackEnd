import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'booking_db',
  password: 'root',
  port: 5432,
});

client.connect();

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'Postgres',
      useValue: client,
    },
  ],
  exports: ['Postgres'],
})
export class DatabaseModule {}
