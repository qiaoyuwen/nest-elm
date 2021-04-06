import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shop-identification')
export class ShopIdentificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128, default: '' })
  companyName: string;

  @Column({ length: 128, default: '' })
  identificateAgency: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  identificateDate: Date;

  @Column({ length: 128, default: '' })
  legalPerson: string;

  @Column({ length: 128, default: '' })
  licensesDate: string;

  @Column({ length: 128, default: '' })
  licensesNumber: string;

  @Column({ length: 128, default: '' })
  licensesScope: string;

  @Column({ length: 128, default: '' })
  operationPeriod: string;

  @Column({ length: 128, default: '' })
  registeredAddress: string;

  @Column({ length: 128, default: '' })
  registeredNumber: string;
}
