import { ResponseDTO } from '@/http/response.dto';
import type { CategoryEntity } from '../categories.entity';

export class QueryCategoriesDTO extends ResponseDTO {
  data: CategoryEntity[];
}
