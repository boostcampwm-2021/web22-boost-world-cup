import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { Worldcup } from './Worldcup';

@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '1' })
  cnt: number;

  @ManyToMany((type) => Worldcup, (worldcup) => worldcup.keywords)
  worldcups: Worldcup[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
