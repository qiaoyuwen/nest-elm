import type { FindOneShopResponseDTO } from './dto/find-one-shop.response.dto';
import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ControllerName } from './shops.constant';
import { ResponseMessage } from '@/http/constant';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { FindOneShopRequestDTO } from './dto/find-one-shop.request.dto';
import { PaginationRequestDTO } from '@/http/pagination.request.dto';
import type { FindAllShopsResponseDTO } from './dto/find-all-shops.response.dto';

@ApiTags(ControllerName)
@Controller(ControllerName)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  @Get()
  async findAll(@Query() params: PaginationRequestDTO): Promise<FindAllShopsResponseDTO> {
    const [list, total] = await this.shopsService.findAll(params);
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data: {
        list,
        current: params.current,
        pageSize: params.pageSize,
        total,
      },
    };
  }

  @Get(':id')
  async findOne(@Param() params: FindOneShopRequestDTO): Promise<FindOneShopResponseDTO> {
    const data = await this.shopsService.findOne(params.id);
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data,
    };
  }
}
