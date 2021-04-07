import { UploadResponseDTO } from './dto/upload.response.dto';
import {
  Controller,
  Post,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { ControllerName } from './files.constant';
import { ResponseMessage } from '@/http/constant';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { AdminEntity } from '@/admins/admins.entity';
import { FileEntity } from './files.entity';
import { UploadRequestDTO } from './dto/upload.request.dto';

@ApiTags(ControllerName)
@Controller(ControllerName)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'), ClassSerializerInterceptor)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadRequestDTO,
  })
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: { user: AdminEntity },
  ): Promise<UploadResponseDTO> {
    const data = await this.filesService.save(
      new FileEntity({
        url: file.path,
        admin: req.user,
      }),
    );

    return new UploadResponseDTO({
      statusCode: HttpStatus.OK,
      message: ResponseMessage.UploadSuccess,
      data,
    });
  }
}
