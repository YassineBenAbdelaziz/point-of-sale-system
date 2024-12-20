import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsArrayOfObjects } from 'src/decorators/validation/is-array-of-objects';
import { CreatePriceListProductDto } from './create-price-list-product.dto';
import { IsNotExpiredDate } from 'src/decorators/validation/is-not-expired-date';

export class CreatePriceListDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  @IsNotExpiredDate()
  expiresAt: Date;

  @IsArray()
  @ArrayNotEmpty()
  @IsArrayOfObjects()
  @ValidateNested({ each: true })
  @Type(() => CreatePriceListProductDto)
  products: CreatePriceListProductDto[];
}
