import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 9, scale: 6 })
  lat: number;

  @Column('decimal', { precision: 9, scale: 6 })
  lon: number;

  @Column({ nullable: true })
  exclude: string;

  @Column('jsonb')
  data: object;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
