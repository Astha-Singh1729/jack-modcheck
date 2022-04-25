import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Panchayat {
  @Column()
  post: string;
  @Column()
  response: string;
  @Column()
  date: string;
  @PrimaryGeneratedColumn()
  id: number;
}
