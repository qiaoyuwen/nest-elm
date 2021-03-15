import { Controller, Get } from '@nestjs/common';
import { CitiesService } from './city.service';
import type { City } from './city.entity';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  async findAll(): Promise<City[]> {
    return this.citiesService.findAll();
  }

  @Get('test')
  @Transaction()
  async test(@TransactionManager() manager: EntityManager): Promise<City> {
    return this.citiesService.create(manager);
  }
}
