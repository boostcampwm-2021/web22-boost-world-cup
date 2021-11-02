import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Worldcup } from './Worldcup';

@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '1' })
  cnt: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne((type) => Worldcup, (worldcup) => worldcup.keywords)
  @JoinColumn({ name: 'worldcup_id' })
  worldcup: Worldcup;
}
