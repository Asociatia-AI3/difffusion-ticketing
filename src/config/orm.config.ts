// src/config/orm.config.ts
import { DataSourceOptions } from 'typeorm';
import { User } from '../user/user.entity';

export const ormConfig: DataSourceOptions = {
  type: 'sqlite',
  database: './ticketing.sqlite',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
};
