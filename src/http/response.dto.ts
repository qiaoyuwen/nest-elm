import type { ResponseMessage } from './constant';

export class ResponseDataDTO {
  statusCode: number;
  message: ResponseMessage;
  error?: Record<string, string>;
}
