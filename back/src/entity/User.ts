import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'provider_id' })
  providerId: string;

  @Column()
  nickname: string;

  @Column()
  gender: number;

  @Column()
  age: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
