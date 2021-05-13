import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage } from '@/http/constant';
import { mockGuard } from '@/mock/guard';
import { mockShopCategoriesService } from '@/mock/shop-categories';
import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShopCategoriesController } from '../shop-categories.controller';
import { ShopCategoryEntity } from '../shop-categories.entity';
import { ShopCategoriesService } from '../shop-categories.service';

describe('ShopCategoriesController', () => {
  let controller: ShopCategoriesController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ShopCategoriesService,
        {
          provide: getRepositoryToken(ShopCategoryEntity),
          useValue: mockShopCategoriesService,
        },
      ],
      controllers: [ShopCategoriesController],
    })
      .overrideProvider(ShopCategoriesService)
      .useValue(mockShopCategoriesService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    controller = moduleRef.get<ShopCategoriesController>(ShopCategoriesController);
  });

  describe('findAll', () => {
    it('should return an array of shop categories', async () => {
      expect(
        await controller.findAll({
          level: 0,
        }),
      ).toStrictEqual({
        data: [],
        statusCode: HttpStatus.OK,
        message: ResponseMessage.QuerySuccess,
      });
    });
  });
});
