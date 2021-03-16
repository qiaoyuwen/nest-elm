import { Controller, Get } from '@nestjs/common';
import { CitiesService } from './city.service';
import type { City } from './city.entity';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  async findAll(): Promise<City[]> {
    return this.citiesService.findAll();
  }
}
