import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
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
  async findAll(): Promise<FindAllShopCategoriesResponseDTO> {
    const data = await this.shopCategoriesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data,
    };
  }
}
