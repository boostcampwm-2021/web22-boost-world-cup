import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '0' })
  total: number;

  @Column({ default: '0' })
  male: number;

  @Column({ default: '0' })
  female: number;

  @Column({ default: '0' })
  teens: number;

  @Column({ default: '0' })
  twenties: number;

  @Column({ default: '0' })
  thirties: number;

  @Column({ default: '0' })
  forties: number;

  @Column({ default: '0' })
  etc: number;
}
