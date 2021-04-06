import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shop-support')
export class ShopSupportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 128 })
  iconName: string;

  @Column({ length: 128 })
  iconColor: string;

  @Column({ length: 1024 })
  description: string;
}
