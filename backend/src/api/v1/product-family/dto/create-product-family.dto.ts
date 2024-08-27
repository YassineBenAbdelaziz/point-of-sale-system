import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductFamilyDto {
  @IsNotEmpty()
  @IsString()
  designation: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
