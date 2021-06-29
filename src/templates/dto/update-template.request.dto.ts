import { IsNotEmpty, ValidateIf } from 'class-validator';

export class UpdateTemplateRequestDTO {
  @ValidateIf((_, value) => value)
  @IsNotEmpty()
  name: string;

  @ValidateIf((_, value) => value)
  @IsNotEmpty()
  content?: string;
}
