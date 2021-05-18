import type { AdminEntity } from '@/admins/admins.entity';
import { ResponseDTO } from '@/http/response.dto';

export class ProfileResponseDTO extends ResponseDTO {
  data: AdminEntity;

  constructor(partial: Partial<ProfileResponseDTO>) {
    super(partial);
    this.data = partial.data;
  }
}
