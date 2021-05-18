import type { HttpStatus } from '@nestjs/common';
import type { ResponseMessage } from './constant';

export class ResponseDTO {
  statusCode: HttpStatus;
  message: ResponseMessage;
  error?: Record<string, string>;

  constructor(partial: Partial<ResponseDTO>) {
    Object.assign(this, partial);
  }
}
