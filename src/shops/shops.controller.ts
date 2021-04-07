import type { FindOneShopResponseDTO } from './dto/find-one-shop.response.dto';
import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ControllerName } from './shops.constant';
import type { FindAllShopsResponseDTO } from './dto/find-all-shops.response.dto';
import { ResponseMessage } from '@/http/constant';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { FindOneShopRequestDTO } from './dto/find-one-shop.request.dto';

@ApiTags(ControllerName)
@Controller(ControllerName)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  @Get()
  async findAll(): Promise<FindAllShopsResponseDTO> {
    const data = await this.shopsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data,
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
