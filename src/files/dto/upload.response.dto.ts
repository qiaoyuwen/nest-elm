import { ResponseDataDTO } from '@/http/response.dto';
import type { FileEntity } from '../files.entity';

export class UploadResponseDTO extends ResponseDataDTO {
  data: FileEntity;

  constructor(partial: Partial<UploadResponseDTO>) {
    super(partial);
    this.data = partial.data;
  }
}
