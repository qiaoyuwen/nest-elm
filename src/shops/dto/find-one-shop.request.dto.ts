import { IsInt } from 'class-validator';

export class FindOneShopRequestDTO {
  @IsInt()
  id: number;
}
