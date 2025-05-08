import { DataSource } from 'typeorm';
import { ormConfig } from './src/config/orm.config';

export const AppDataSource = new DataSource(ormConfig);