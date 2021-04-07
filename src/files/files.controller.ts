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
import { ApiTags } from '@nestjs/swagger';
import { ControllerName } from './files.constant';
import { ResponseMessage } from '@/http/constant';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { AdminEntity } from '@/admins/admins.entity';
import { FileEntity } from './files.entity';

@ApiTags(ControllerName)
@Controller(ControllerName)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'), ClassSerializerInterceptor)
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
