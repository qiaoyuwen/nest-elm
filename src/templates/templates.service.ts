import { Injectable } from '@nestjs/common';
import { TemplateEntity } from './templates.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { PaginationRequestDTO } from '@/http/pagination.request.dto';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
  ) {}

  findAll(pagination: PaginationRequestDTO): Promise<[TemplateEntity[], number]> {
    return this.templateRepository.findAndCount({
      skip: (pagination.current - 1) * pagination.pageSize,
      take: pagination.pageSize,
    });
  }

  findOne(id: number): Promise<TemplateEntity> {
    return this.templateRepository.findOne(id);
  }
}
