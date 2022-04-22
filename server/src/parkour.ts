import { DataSource } from 'typeorm';
import { Panchayat } from './ingredients/entities/Panchayat';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'asthasingh',
  password: 'pepega1729',
  database: 'jackbakaslap',
  synchronize: true,
  logging: true,
  entities: [Panchayat],
});
