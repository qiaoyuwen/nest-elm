import { ResponseDTO } from '@/http/response.dto';
import type { ShopsPaginationDTO } from './shops-pagination.dto';

export class FindAllShopsResponseDTO extends ResponseDTO {
  data: ShopsPaginationDTO;
}
