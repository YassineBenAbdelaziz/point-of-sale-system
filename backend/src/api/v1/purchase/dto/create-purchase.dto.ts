import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
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

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  buyX_getY_codes: string[];
}
