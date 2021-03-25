import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shop-activity')
export class ShopCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 128 })
  iconName: string;

  @Column({ length: 128 })
  iconColor: string;

  @Column({ length: 128 })
  description: string;

  @Column('integer')
  rankingWeight: number;
}
