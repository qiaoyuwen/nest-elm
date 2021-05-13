import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage } from '@/http/constant';
import { mockGuard } from '@/mock/guard';
import { ShopsService } from '@/shops/shops.service';
import { ShopEntity } from '@/shops/shops.entity';
import { mockShopsService } from '@/mock/shops';
import { ShopsController } from '@/shops/shops.controller';

describe('ShopsModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/shops (GET)', () => {
    return request(app.getHttpServer()).get('/shops').expect(200).expect({
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data: mockShopsService.findAll(),
    });
  });

  it('/shops/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/shops/1')
      .expect(200)
      .expect({
        statusCode: HttpStatus.OK,
        message: ResponseMessage.QuerySuccess,
        data: {
          ...mockShopsService.findOne(),
        },
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
