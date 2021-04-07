import { ShopSupportEntity } from './supports/supports.entity';
import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ShopActivityEntity } from './activities/activities.entity';
import { ShopCategoryEntity } from '../shop-categories/shop-categories.entity';
import { ShopDeliveryModeEntity } from './delivery-modes/delivery-modes.entity';
import { ShopIdentificationEntity } from './identifications/identifications.entity';

@Entity('shop')
export class ShopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1024, default: '' })
  address: string;

  @ManyToMany(() => ShopActivityEntity)
  @JoinTable()
  activities: ShopActivityEntity[];

  @ManyToOne(() => ShopDeliveryModeEntity)
  deliveryMode: ShopDeliveryModeEntity;

  @Column({ length: 1024, default: '' })
  description: string;

  @Column({ type: 'datetime' })
  orderLeadTime: Date;

  @Column({ length: 128, default: '' })
  distance: string;

  // TODO
  @Column({ length: 128, default: '2d' })
  location: string;

  @Column('double')
  floatDeliveryFee: number;

  @Column('double')
  floatMinimumOrderAmount: number;

  @ManyToMany(() => ShopCategoryEntity)
  @JoinTable()
  categories: ShopCategoryEntity[];

  @OneToOne(() => ShopIdentificationEntity)
  @JoinColumn()
  identification: ShopIdentificationEntity;

  @Column({ length: 1024, default: '' })
  imagePath: string;

  @Column({ type: Boolean, default: false })
  isPremium: boolean;

  @Column({ type: Boolean, default: false })
  isNew: boolean;

  @Column('double')
  latitude: number;

  @Column('double')
  longitude: number;

  @Column({ length: 1024, default: '' })
  businessLicenseImage: string;

  @Column({ length: 1024, default: '' })
  cateringServiceLicenseImage: string;

  @IsNotEmpty()
  @Column({ length: 128 })
  name: string;

  @Column({ length: 1024, default: `["08:30/20:30"]` })
  openingHours: string;

  @IsNotEmpty()
  @Column({ length: 128 })
  phone: string;

  @Column({ length: 128, default: '' })
  piecewiseAgentFee: string;

  @Column({ length: 128, default: '欢迎光临，用餐高峰请提前下单，谢谢' })
  promotionInfo: string;

  @Column('double', { default: 0 })
  rating: number;

  @Column('int', { default: 0 })
  ratingCount: number;

  @Column('int', { default: 0 })
  recentOrderNum: number;

  @Column('int', { default: 0 })
  status: number;

  @ManyToMany(() => ShopSupportEntity)
  @JoinTable()
  supports: ShopSupportEntity[];
}
