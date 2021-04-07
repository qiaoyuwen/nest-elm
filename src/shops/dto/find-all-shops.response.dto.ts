import { ResponseDataDTO } from '@/http/response.dto';
import type { ShopEntity } from '../shops.entity';

export class FindAllShopsResponseDTO extends ResponseDataDTO {
  data: ShopEntity[];
}
