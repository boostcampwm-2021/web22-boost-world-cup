import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Candidate } from './Candidate';
import { Keyword } from './Keyword';
import { Comment } from './Comment';
import { User } from './User';

@Entity()
export class Worldcup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  thumbnail1: string;

  @Column({ nullable: true })
  thumbnail2: string;

  @Column({ name: 'total_cnt', default: '0' })
  totalCnt: number;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'is_temp', default: '0' })
  isTemp: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany((type) => Candidate, (candidate) => candidate.worldcup, { cascade: true })
  candidates: Candidate[];

  @ManyToMany((type) => Keyword, (keyword) => keyword, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'worldcup_keyword',
    joinColumn: { name: 'worldcup_id' },
    inverseJoinColumn: { name: 'keyword_id' },
  })
  keywords: Keyword[];

  @OneToMany((type) => Comment, (comment) => comment.worldcup, { cascade: true })
  comments: Comment[];

  @ManyToOne((type) => User, (user) => user.worldcups)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
