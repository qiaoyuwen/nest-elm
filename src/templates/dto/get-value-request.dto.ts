import { IsNotEmpty } from 'class-validator';

export class GetValueRequestDTO {
  @IsNotEmpty()
  tableName: string;
  @IsNotEmpty()
  fieldName: string;
}
