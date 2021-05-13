import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage } from '@/http/constant';
import { mockGuard } from '@/mock/guard';
import { CitiesService } from '@/cities/cities.service';
import { mockCitiesService } from '@/mock/cities';
import { CitiesController } from '@/cities/cities.controller';
import { CityEntity } from '@/cities/cities.entity';

describe('CitiesModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        {
          provide: getRepositoryToken(CityEntity),
          useValue: mockCitiesService,
        },
      ],
      controllers: [CitiesController],
    })
      .overrideProvider(CitiesService)
      .useValue(mockCitiesService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cities (GET)', () => {
    return request(app.getHttpServer()).get('/cities').expect(200).expect({
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data: mockCitiesService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
