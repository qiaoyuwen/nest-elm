import { Injectable } from '@nestjs/common';
import { CityEntity } from './cities.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  findAll(): Promise<CityEntity[]> {
    return this.cityRepository.find();
  }
}
