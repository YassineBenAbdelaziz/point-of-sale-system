import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { PaginationParams } from 'src/shared/classes/paginationParams';

export class FindProductsDto extends PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  parent?: number;
}
