import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateBuyXGetYDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  xProductId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  yProductId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  xQuantity: number;
}
