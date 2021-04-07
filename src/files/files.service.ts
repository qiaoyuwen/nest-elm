import { Injectable } from '@nestjs/common';
import { FileEntity } from './files.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  save(fileEntity: FileEntity): Promise<FileEntity> {
    return this.fileRepository.save(fileEntity);
  }
}
