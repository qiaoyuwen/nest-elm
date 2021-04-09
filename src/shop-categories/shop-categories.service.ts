import type { FindAllShopCategoriesRequestDTO } from './dto/find-all-shop-categories.request.dto';
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

  findAll(query: FindAllShopCategoriesRequestDTO): Promise<ShopCategoryEntity[]> {
    return this.shopCategoryRepository.find(query);
  }
}
