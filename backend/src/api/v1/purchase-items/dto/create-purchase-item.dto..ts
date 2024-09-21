import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from 'class-validator';

export class CreatePurchaseItemDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  adjustedPrice: number;
}
