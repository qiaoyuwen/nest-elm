import { Injectable } from '@nestjs/common';
import { ShopEntity } from './shops.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { PaginationRequestDTO } from '@/http/pagination.request.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  findAll(pagination: PaginationRequestDTO): Promise<[ShopEntity[], number]> {
    return this.shopRepository.findAndCount({
      skip: (pagination.current - 1) * pagination.pageSize,
      take: pagination.pageSize,
    });
  }

  findOne(id: number): Promise<ShopEntity> {
    return this.shopRepository.findOne(id);
  }
}
