import { Controller, Get, HttpStatus } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiTags } from '@nestjs/swagger';
import { ControllerName } from './cities.constant';
import type { QueryCitiesDTO } from './dto/query-cities.dto';
import { ResponseMessage } from '@/http/constant';

@ApiTags(ControllerName)
@Controller(ControllerName)
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  async findAll(): Promise<QueryCitiesDTO> {
    const data = await this.citiesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data,
    };
  }
}
