import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 128 })
  abbr: string;

  @Column({ length: 128 })
  areaCode: string;

  @Column('int')
  sort: number;

  @Column('double')
  latitude: number;

  @Column('double')
  longitude: number;

  @Column('boolean')
  isMap: boolean;

  @Column({ length: 128 })
  pinyin: string;

  @Column('boolean')
  isHot: boolean;
}
