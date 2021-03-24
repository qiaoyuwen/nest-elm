import { Column, PrimaryGeneratedColumn } from 'typeorm';

export enum AdminStatusType {
  Normal = 1,
  Super = 2,
}

export class AdminProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128, unique: true })
  username: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  createTime: Date;

  @Column({ type: 'enum', enum: AdminStatusType, default: AdminStatusType.Super })
  status: AdminStatusType;

  @Column({ length: 1024, default: 'default.jpg' })
  avatar: string;
}
