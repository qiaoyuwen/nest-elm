import type { AdminProfileEntity } from '@/admins/admins-profile.entity';
import { ResponseDataDTO } from '@/http/response.dto';

export class ProfileDTO extends ResponseDataDTO {
  data: AdminProfileEntity;
}
