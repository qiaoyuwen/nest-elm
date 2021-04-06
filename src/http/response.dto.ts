import type { HttpStatus } from '@nestjs/common';
import type { ResponseMessage } from './constant';

export class ResponseDataDTO {
  statusCode: HttpStatus;
  message: ResponseMessage;
  error?: Record<string, string>;

  constructor(partial: Partial<ResponseDataDTO>) {
    Object.assign(this, partial);
  }
}
