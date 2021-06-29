import { ResponseDTO } from '@/http/response.dto';
import type { TemplateEntity } from '../templates.entity';

export class FindOneTemplateResponseDTO extends ResponseDTO {
  data: TemplateEntity;
}
