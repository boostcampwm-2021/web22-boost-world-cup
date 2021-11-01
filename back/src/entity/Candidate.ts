import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm';
import { Info } from './Info';
@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ name: 'show_cnt', default: '0' })
  showCnt: number;

  @Column({ name: 'win_cnt', default: '0' })
  winCnt: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToOne((type) => Info, (info) => info.candidate, { cascade: true })
  info: Info;
}
