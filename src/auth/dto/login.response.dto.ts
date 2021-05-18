import { ResponseDTO } from '@/http/response.dto';

export class LoginResponseDTO extends ResponseDTO {
  data?: {
    accessToken: string;
  };
}
