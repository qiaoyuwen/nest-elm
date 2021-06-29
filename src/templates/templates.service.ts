import { Injectable } from '@nestjs/common';
import { TemplateEntity } from './templates.entity';
import { Repository, getConnection } from 'typeorm';
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

  save(item: TemplateEntity): Promise<TemplateEntity> {
    return this.templateRepository.save(item);
  }

  remove(id: number) {
    return this.templateRepository.delete(id);
  }

  async getValue(tableName: string, fieldName: string) {
    const connection = getConnection();
    const rowData = await connection.query(`select ${fieldName} from ${tableName} limit 1`);
    return rowData[0]?.[fieldName] as string;
  }
}
