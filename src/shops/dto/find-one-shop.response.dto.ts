import { ResponseDataDTO } from '@/http/response.dto';
import type { ShopEntity } from '../shops.entity';

export class FindOneShopResponseDTO extends ResponseDataDTO {
  data: ShopEntity;
}
