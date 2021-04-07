import { AdminEntity } from '@/admins/admins.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  url: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  createTime: Date;

  @ManyToOne(() => AdminEntity)
  admin: AdminEntity;

  constructor(partial: Partial<FileEntity>) {
    Object.assign(this, partial);
  }
}
