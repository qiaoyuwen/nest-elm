import { IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateTemplateRequestDTO {
  @IsNotEmpty()
  name: string;

  @ValidateIf((_, value) => value)
  @IsNotEmpty()
  content?: string;
}
