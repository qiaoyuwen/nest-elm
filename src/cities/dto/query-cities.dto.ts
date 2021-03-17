import { ResponseDataDTO } from '@/http/response.dto';
import type { CityEntity } from '../cities.entity';

export class QueryCitiesDTO extends ResponseDataDTO {
  data: CityEntity[];
}
