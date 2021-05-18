import { ResponseDTO } from '@/http/response.dto';
import type { ShopCategoryEntity } from '../shop-categories.entity';

export class FindAllShopCategoriesResponseDTO extends ResponseDTO {
  data: ShopCategoryEntity[];
}
