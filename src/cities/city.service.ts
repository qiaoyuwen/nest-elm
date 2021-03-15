import { Injectable, Inject } from '@nestjs/common';
import { City } from './city.entity';
import { CITY_REPOSITORY } from '@/db/constant';
import { Repository } from 'typeorm';
import type { EntityManager } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly cityRepository: Repository<City>,
  ) {}

  findAll(): Promise<City[]> {
    return this.cityRepository.find();
  }

  async create(manager: EntityManager) {
    const createCity = new City();
    createCity.id = 1;
    createCity.name = '上海';
    createCity.abbr = 'SH';
    createCity.areaCode = '021';
    createCity.sort = 1;
    createCity.latitude = 31.23037;
    createCity.longitude = 121.473701;
    createCity.isMap = true;
    createCity.pinyin = 'shanghai';

    return manager.save(createCity);
  }
}
