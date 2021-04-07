import { Injectable } from '@nestjs/common';
import { ShopCategoryEntity } from './shop-categories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShopCategoriesService {
  constructor(
    @InjectRepository(ShopCategoryEntity)
    private readonly shopCategoryRepository: Repository<ShopCategoryEntity>,
  ) {}

  findAll(): Promise<ShopCategoryEntity[]> {
    return this.shopCategoryRepository.find();
  }
}
