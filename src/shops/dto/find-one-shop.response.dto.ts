import { ResponseDTO } from '@/http/response.dto';
import type { ShopEntity } from '../shops.entity';

export class FindOneShopResponseDTO extends ResponseDTO {
  data: ShopEntity;
}
