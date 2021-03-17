import { ResponseDataDTO } from '@/http/response.dto';
import type { CategoryEntity } from '../categories.entity';

export class QueryCategoriesDTO extends ResponseDataDTO {
  data: CategoryEntity[];
}
