import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreatePriceListProductDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  productId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  minQuantity: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  newPrice: number;
}
