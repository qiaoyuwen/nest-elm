import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum AdminStatusType {
  Normal = 1,
  Super = 2,
}

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  @Exclude()
  password: string;

  @Column({ length: 128, unique: true })
  username: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  createTime: Date;

  @Column({
    type: 'enum',
    enum: AdminStatusType,
    default: AdminStatusType.Super,
    comment: '普通管理员=1，超级管理员=2',
  })
  status: AdminStatusType;

  @Column({ length: 1024, default: 'default.jpg' })
  avatar: string;

  @Exclude()
  iat: number;

  @Exclude()
  exp: number;

  constructor(partial: Partial<AdminEntity>) {
    Object.assign(this, partial);
  }
}
