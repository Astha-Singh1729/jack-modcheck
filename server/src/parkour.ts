import { DataSource } from 'typeorm';
import { Panchayat } from './ingredients/entities/Panchayat';
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },

  username: 'asthasingh',
  password: 'pepega1729',
  database: 'jackbakaslap',
  synchronize: true,
  logging: true,
  entities: [Panchayat],
});
