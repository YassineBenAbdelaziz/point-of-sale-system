import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { CreatePurchaseItemDto } from '../../purchase-items/dto/create-purchase-item.dto.';
import { Type } from 'class-transformer';
import { IsArrayOfObjects } from 'src/decorators/validation/is-array-of-objects';

export class CreatePurchaseDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  customerId?: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsArrayOfObjects()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseItemDto)
  items: CreatePurchaseItemDto[];
}
