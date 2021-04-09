import { validateIfNotUndefined } from './../../utils/class-validator/index';
import { IsInt, IsPositive, ValidateIf } from 'class-validator';

export class FindAllShopCategoriesRequestDTO {
  @ValidateIf(validateIfNotUndefined('level'))
  @IsPositive()
  @IsInt()
  level?: number;

  @ValidateIf(validateIfNotUndefined('parentId'))
  @IsPositive()
  @IsInt()
  parentId?: number;
}
