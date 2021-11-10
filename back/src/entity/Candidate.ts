import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { Info } from './Info';
import { Worldcup } from './Worldcup';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

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

  @ManyToOne((type) => Worldcup, (worldcup) => worldcup.candidates)
  @JoinColumn({ name: 'worldcup_id' })
  worldcup: Worldcup;
}
