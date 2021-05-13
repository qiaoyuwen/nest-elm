import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage } from '@/http/constant';
import { mockGuard } from '@/mock/guard';
import { FilesService } from '@/files/files.service';
import { FileEntity } from '@/files/files.entity';
import { mockFileEntity, mockFilesService } from '@/mock/files';
import { FilesController } from '@/files/files.controller';

describe('FilesModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        {
          provide: getRepositoryToken(FileEntity),
          useValue: mockFilesService,
        },
      ],
      controllers: [FilesController],
    })
      .overrideProvider(FilesService)
      .useValue(mockFilesService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/files (POST)', () => {
    const buffer = Buffer.from('');
    return request(app.getHttpServer())
      .post('/files')
      .attach('file', buffer, 'upload-test.json')
      .expect(201)
      .expect({
        statusCode: HttpStatus.OK,
        message: ResponseMessage.UploadSuccess,
        data: { ...mockFileEntity },
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
