import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shop-delivery-mode')
export class ShopDeliveryModeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1024 })
  text: string;

  @Column({ length: 128 })
  color: string;

  @Column({ type: Boolean })
  isSolid: string;
}
