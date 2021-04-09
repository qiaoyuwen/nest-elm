import { validateIfNotUndefined } from './../../utils/class-validator/index';
import { IsInt, IsPositive, ValidateIf } from 'class-validator';

export class FindAllShopCategoriesRequestDTO {
  /**
   * 类别分级
   */
  @ValidateIf(validateIfNotUndefined('level'))
  @IsPositive()
  @IsInt()
  level?: number;

  /**
   * 父类别ID
   */
  @ValidateIf(validateIfNotUndefined('parentId'))
  @IsPositive()
  @IsInt()
  parentId?: number;
}
