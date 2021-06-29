import { ResponseDTO } from '@/http/response.dto';
import type { TemplatesPaginationDTO } from './templates-pagination.dto';

export class FindAllTemplatesResponseDTO extends ResponseDTO {
  data: TemplatesPaginationDTO;
}
