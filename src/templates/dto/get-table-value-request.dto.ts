import { IsNotEmpty } from 'class-validator';

export class GetTableValueRequestDTO {
  @IsNotEmpty()
  tableName: string;
}
