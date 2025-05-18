// src/config/orm.config.ts
import { DataSourceOptions } from 'typeorm';
import { User } from '../user/user.entity';
import { join } from 'path';

const root = process.cwd();

export const ormConfig: DataSourceOptions = {
  type: 'sqlite',
  database: join(root, 'ticketing.sqlite'),
  entities: [User],
  migrations: [join(root, 'migrations/*.ts')],
  synchronize: true,
};
