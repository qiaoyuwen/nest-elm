import { PaginationResponseDTO } from '@/http/pagination.response.dto';
import type { TemplateEntity } from '../templates.entity';

export class TemplatesPaginationDTO extends PaginationResponseDTO {
  list: TemplateEntity[];
}
