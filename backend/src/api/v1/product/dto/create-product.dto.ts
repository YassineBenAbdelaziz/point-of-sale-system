import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  designation: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  price: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  familyId?: number;

  @IsOptional()
  image: string;

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  categoriesIds: number[];
}
