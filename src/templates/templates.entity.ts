import { AdminEntity } from '@/admins/admins.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('template')
export class TemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  createTime: Date;

  @Column({ type: 'longtext', default: null })
  content: string;

  @ManyToOne(() => AdminEntity)
  admin: AdminEntity;

  constructor(partial: Partial<TemplateEntity>) {
    Object.assign(this, partial);
  }
}
