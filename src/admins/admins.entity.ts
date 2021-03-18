import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum AdminStatusType {
  Normal = 1,
  Super = 2,
}

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128, unique: true })
  username: string;

  @Column({ length: 128 })
  password: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  createTime: Date;

  @Column({ type: 'enum', enum: AdminStatusType })
  status: AdminStatusType;

  @Column({ length: 1024 })
  avatar: string;
}
