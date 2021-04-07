import { ResponseDataDTO } from '@/http/response.dto';

export class LoginResponseDTO extends ResponseDataDTO {
  data?: {
    accessToken: string;
  };
}
