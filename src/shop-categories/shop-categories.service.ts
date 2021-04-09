import type { FindAllShopCategoriesRequestDTO } from './dto/find-all-shop-categories.request.dto';
import { Injectable } from '@nestjs/common';
import { ShopCategoryEntity } from './shop-categories.entity';
import type { FindConditions } from 'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShopCategoriesService {
  constructor(
    @InjectRepository(ShopCategoryEntity)
    private readonly shopCategoryRepository: Repository<ShopCategoryEntity>,
  ) {}

  findAll(query: FindAllShopCategoriesRequestDTO): Promise<ShopCategoryEntity[]> {
    const condition: FindConditions<ShopCategoryEntity> = {};
    if (query.level) {
      condition.level = query.level;
    }
    if (query.parentId) {
      condition.parent = {
        id: query.parentId,
      };
    }
    return this.shopCategoryRepository.find(condition);
  }
}
