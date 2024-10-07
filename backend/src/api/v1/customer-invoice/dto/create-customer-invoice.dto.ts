import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreatePaymentDto } from '../../payments/dto/create-payment.dto';
import { IsArrayOfObjects } from 'src/decorators/validation/is-array-of-objects';
import { Type } from 'class-transformer';

export class CreateCustomerInvoiceDto {
  @IsString()
  discount_code: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  purchaseId: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsArrayOfObjects()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentDto)
  payments: CreatePaymentDto[];
}
