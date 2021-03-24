import { Entity, Column } from 'typeorm';
import { AdminProfileEntity } from './admins-profile.entity';

@Entity('admin')
export class AdminEntity extends AdminProfileEntity {
  @Column({ length: 128 })
  password: string;
}
