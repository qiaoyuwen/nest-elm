import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { ControllerName } from './categories.constant';
import type { QueryCategoriesDTO } from './dto/query-categories.dto';

@ApiTags(ControllerName)
@Controller(ControllerName)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<QueryCategoriesDTO> {
    const data = await this.categoriesService.findAll();
    return {
      statusCode: 200,
      message: '查询成功',
      data,
    };
  }
}
