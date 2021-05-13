import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage } from '@/http/constant';
import { mockCitiesService } from '@/mock/cities';
import { mockGuard } from '@/mock/guard';
import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CitiesController } from '../cities.controller';
import { CityEntity } from '../cities.entity';
import { CitiesService } from '../cities.service';

describe('CitiesController', () => {
  let controller: CitiesController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
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

    controller = moduleRef.get<CitiesController>(CitiesController);
  });

  describe('findAll', () => {
    it('should return an array of cities', async () => {
      expect(await controller.findAll()).toStrictEqual({
        data: [],
        statusCode: HttpStatus.OK,
        message: ResponseMessage.QuerySuccess,
      });
    });
  });
});
