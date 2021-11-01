import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Candidate } from './Candidate';
import { Keyword } from './Keyword';

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
  desc: string;

  @Column({ name: 'is_temp', default: '0' })
  isTemp: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany((type) => Candidate, (candidate) => candidate.worldcup)
  candidates: Candidate[];

  @OneToMany((type) => Keyword, (keyword) => keyword.worldcup)
  keywords: Keyword[];
}
