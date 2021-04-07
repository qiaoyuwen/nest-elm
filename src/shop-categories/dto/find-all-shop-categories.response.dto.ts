import { ResponseDataDTO } from '@/http/response.dto';
import type { ShopCategoryEntity } from '../shop-categories.entity';

export class FindAllShopCategoriesResponseDTO extends ResponseDataDTO {
  data: ShopCategoryEntity[];
}
