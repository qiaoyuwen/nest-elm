import { ResponseDataDTO } from '@/http/response.dto';

export class LoginDTO extends ResponseDataDTO {
  data?: {
    accessToken: string;
  };
}
