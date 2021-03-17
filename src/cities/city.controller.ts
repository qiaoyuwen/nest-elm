import { Controller, Get } from '@nestjs/common';
import { CitiesService } from './city.service';
import type { CityEntity } from './city.entity';
import { ApiTags } from '@nestjs/swagger';
import { ControllerName } from './city.constant';

@ApiTags(ControllerName)
@Controller(ControllerName)
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  async findAll(): Promise<CityEntity[]> {
    return this.citiesService.findAll();
  }
}
