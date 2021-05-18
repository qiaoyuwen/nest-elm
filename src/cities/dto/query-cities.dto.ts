import { ResponseDTO } from '@/http/response.dto';
import type { CityEntity } from '../cities.entity';

export class QueryCitiesDTO extends ResponseDTO {
  data: CityEntity[];
}
