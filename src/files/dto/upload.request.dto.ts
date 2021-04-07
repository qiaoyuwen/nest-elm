import { ApiProperty } from '@nestjs/swagger';

export class UploadRequestDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
