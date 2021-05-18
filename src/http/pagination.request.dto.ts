import { IsInt } from 'class-validator';

export class PaginationRequestDTO {
  @IsInt()
  current: number;
  @IsInt()
  pageSize: number;
}
