import type { AdminEntity } from '@/admins/admins.entity';
import { ResponseDataDTO } from '@/http/response.dto';

export class ProfileDTO extends ResponseDataDTO {
  data: AdminEntity;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(partial: Partial<ProfileDTO>) {
    super(partial);
  }
}
