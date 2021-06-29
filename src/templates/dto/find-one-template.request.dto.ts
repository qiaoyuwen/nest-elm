import { IsInt } from 'class-validator';

export class FindOneTemplateRequestDTO {
  @IsInt()
  id: number;
}
