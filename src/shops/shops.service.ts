import { Injectable } from '@nestjs/common';
import { ShopEntity } from './shops.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  findAll(): Promise<ShopEntity[]> {
    return this.shopRepository.find();
  }

  findOne(id: number): Promise<ShopEntity> {
    return this.shopRepository.findOne(id);
  }
}
