import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage } from '@/http/constant';
import { mockCategoriesService } from '@/mock/categories';
import { mockGuard } from '@/mock/guard';
import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesController } from '../categories.controller';
import { CategoryEntity } from '../categories.entity';
import { CategoriesService } from '../categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
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

    service = moduleRef.get<CategoriesService>(CategoriesService);
    controller = moduleRef.get<CategoriesController>(CategoriesController);
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = [];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toStrictEqual({
        data: result,
        statusCode: HttpStatus.OK,
        message: ResponseMessage.QuerySuccess,
      });
    });
  });
});
