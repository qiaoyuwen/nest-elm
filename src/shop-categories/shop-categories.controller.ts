import { FindAllShopCategoriesRequestDTO } from './dto/find-all-shop-categories.request.dto';
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ShopCategoriesService } from './shop-categories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ControllerName } from './shop-categories.constant';
import type { FindAllShopCategoriesResponseDTO } from './dto/find-all-shop-categories.response.dto';
import { ResponseMessage } from '@/http/constant';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@ApiTags(ControllerName)
@Controller(ControllerName)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ShopCategoriesController {
  constructor(private shopCategoriesService: ShopCategoriesService) {}

  @Get()
  async findAll(
    @Query() query: FindAllShopCategoriesRequestDTO,
  ): Promise<FindAllShopCategoriesResponseDTO> {
    const data = await this.shopCategoriesService.findAll(query);
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data,
    };
  }
}
