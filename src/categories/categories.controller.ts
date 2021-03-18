import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { ControllerName } from './categories.constant';
import type { QueryCategoriesDTO } from './dto/query-categories.dto';
import { ResponseMessage } from '@/http/constant';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@ApiTags(ControllerName)
@Controller(ControllerName)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<QueryCategoriesDTO> {
    const data = await this.categoriesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data,
    };
  }
}
