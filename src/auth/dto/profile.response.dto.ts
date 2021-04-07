import type { AdminEntity } from '@/admins/admins.entity';
import { ResponseDataDTO } from '@/http/response.dto';

export class ProfileResponseDTO extends ResponseDataDTO {
  data: AdminEntity;

  constructor(partial: Partial<ProfileResponseDTO>) {
    super(partial);
    this.data = partial.data;
  }
}
