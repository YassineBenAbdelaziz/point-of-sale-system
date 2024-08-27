import { PartialType } from '@nestjs/mapped-types';
import { CreateProductFamilyDto } from './create-product-family.dto';

export class UpdateProductFamilyDto extends PartialType(
  CreateProductFamilyDto,
  {
    skipNullProperties: false,
  },
) {}
