import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Worldcup } from './Worldcup';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne((type) => Worldcup, (worldcup) => worldcup.comments)
  @JoinColumn({ name: 'worldcup_id' })
  worldcup: Worldcup;
}
