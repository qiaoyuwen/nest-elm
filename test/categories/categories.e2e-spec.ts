import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { CategoriesController } from '@/categories/categories.controller';
import { CategoriesService } from '@/categories/categories.service';
import { CategoryEntity } from '@/categories/categories.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage } from '@/http/constant';
import { mockCategoriesService } from '@/mock/categories';
import { mockGuard } from '@/mock/guard';

describe('CategoriesModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: mockCategoriesService,
        },
      ],
      controllers: [CategoriesController],
    })
      .overrideProvider(CategoriesService)
      .useValue(mockCategoriesService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/categories (GET)', () => {
    return request(app.getHttpServer()).get('/categories').expect(200).expect({
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data: mockCategoriesService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
