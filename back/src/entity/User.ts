import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Worldcup } from './Worldcup';
import { Comment } from './Comment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'provider_id' })
  providerId: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  nickname: string;

  @Column({ nullable: true })
  gender: number;

  @Column({ nullable: true })
  age: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany((type) => Comment, (comment) => comment.worldcup, { cascade: true })
  comments: Comment[];

  @OneToMany((type) => Worldcup, (worldcup) => worldcup.user, { cascade: true })
  worldcups: Worldcup[];
}
