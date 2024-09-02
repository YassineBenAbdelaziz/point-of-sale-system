import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['categoryId'] as const),
  {
    skipNullProperties: false,
  },
) {
  @IsOptional()
  @IsInt()
  @IsPositive()
  categoryId?: number;
}
