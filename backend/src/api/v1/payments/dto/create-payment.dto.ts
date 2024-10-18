import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0.1)
  price: number;

  @IsNotEmpty()
  @IsInt()
  paymentTypeId: number;
}
