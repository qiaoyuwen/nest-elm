import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage } from '@/http/constant';
import { mockGuard } from '@/mock/guard';
import { mockShopEntity, mockShopsService } from '@/mock/shops';
import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShopsController } from '../shops.controller';
import { ShopEntity } from '../shops.entity';
import { ShopsService } from '../shops.service';

describe('ShopsController', () => {
  let controller: ShopsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ShopsService,
        {
          provide: getRepositoryToken(ShopEntity),
          useValue: mockShopsService,
        },
      ],
      controllers: [ShopsController],
    })
      .overrideProvider(ShopsService)
      .useValue(mockShopsService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    controller = moduleRef.get<ShopsController>(ShopsController);
  });

  describe('findAll', () => {
    it('should return an array of shops', async () => {
      expect(await controller.findAll()).toStrictEqual({
        data: [],
        statusCode: HttpStatus.OK,
        message: ResponseMessage.QuerySuccess,
      });
    });
  });

  describe('findOne', () => {
    it('should return an shop by id', async () => {
      expect(
        await controller.findOne({
          id: 1,
        }),
      ).toStrictEqual({
        data: mockShopEntity,
        statusCode: HttpStatus.OK,
        message: ResponseMessage.QuerySuccess,
      });
    });
  });
});
