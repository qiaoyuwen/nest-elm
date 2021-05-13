import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage } from '@/http/constant';
import { mockGuard } from '@/mock/guard';
import { ShopCategoriesService } from '@/shop-categories/shop-categories.service';
import { ShopCategoryEntity } from '@/shop-categories/shop-categories.entity';
import { mockShopCategoriesService } from '@/mock/shop-categories';
import { ShopCategoriesController } from '@/shop-categories/shop-categories.controller';

describe('ShopCategoriesModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/shop-categories (GET)', () => {
    return request(app.getHttpServer()).get('/shop-categories').expect(200).expect({
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data: mockShopCategoriesService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
