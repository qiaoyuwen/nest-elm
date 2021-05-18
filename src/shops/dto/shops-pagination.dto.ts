import { PaginationResponseDTO } from '@/http/pagination.response.dto';
import type { ShopEntity } from '../shops.entity';

export class ShopsPaginationDTO extends PaginationResponseDTO {
  list: ShopEntity[];
}
