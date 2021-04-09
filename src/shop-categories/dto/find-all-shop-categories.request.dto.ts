import { IsInt, IsPositive } from 'class-validator';

export class FindAllShopCategoriesRequestDTO {
  @IsPositive()
  @IsInt()
  level: number;
}
