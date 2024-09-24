import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(0.99)
  percentage: number;
}
