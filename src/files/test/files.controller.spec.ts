import type { AdminEntity } from '@/admins/admins.entity';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage } from '@/http/constant';
import { mockFileEntity, mockFilesService } from '@/mock/files';
import { mockGuard } from '@/mock/guard';
import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UploadResponseDTO } from '../dto/upload.response.dto';
import { FilesController } from '../files.controller';
import { FileEntity } from '../files.entity';
import { FilesService } from '../files.service';

describe('FilesController', () => {
  let controller: FilesController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
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

    controller = moduleRef.get<FilesController>(FilesController);
  });

  describe('upload', () => {
    it('should return an file entity', async () => {
      expect(
        await controller.upload({} as Express.Multer.File, {
          user: {} as AdminEntity,
        }),
      ).toStrictEqual(
        new UploadResponseDTO({
          data: mockFileEntity,
          statusCode: HttpStatus.OK,
          message: ResponseMessage.UploadSuccess,
        }),
      );
    });
  });
});
