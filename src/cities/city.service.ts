import { Injectable, Inject } from '@nestjs/common';
import type { City } from './city.entity';
import { CITY_REPOSITORY } from '@/db/constant';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly cityRepository: Repository<City>,
  ) {}

  findAll(): Promise<City[]> {
    return this.cityRepository.find();
  }
}
