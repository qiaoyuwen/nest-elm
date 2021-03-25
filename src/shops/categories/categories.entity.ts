import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('shop-category')
export class ShopCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 128 })
  imageUrl: string;

  @Column('integer')
  level: number;

  @Column('integer')
  count: number;

  @ManyToOne(() => ShopCategoryEntity)
  parent: ShopCategoryEntity;
}
