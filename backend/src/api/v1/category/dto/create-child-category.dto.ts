import { OmitType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class CreateChildCategoryDto extends OmitType(CreateCategoryDto, [
  'parentId',
] as const) {}
