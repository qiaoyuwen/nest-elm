import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean')
  isInServing: boolean;

  @Column({ length: 128 })
  description: string;

  @Column({ length: 128 })
  title: string;

  @Column({ length: 512 })
  link: string;

  @Column({ length: 512 })
  imageUrl: string;

  @Column({ length: 512 })
  iconUrl: string;

  @Column({ length: 128 })
  titleColor: string;
}
