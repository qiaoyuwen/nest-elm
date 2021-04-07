import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FileEntity } from './files.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    MulterModule.register({
      storage: diskStorage({
        destination: `./upload/files/${moment().format('YYYY-MM-DD')}`,
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
