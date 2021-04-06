import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ShopActivityEntity } from './activities/activities.entity';

@Entity('shop')
export class ShopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => ShopActivityEntity)
  @JoinTable()
  activities: ShopActivityEntity[];
}
