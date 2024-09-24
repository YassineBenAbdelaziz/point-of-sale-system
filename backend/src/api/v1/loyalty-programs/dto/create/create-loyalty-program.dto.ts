import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { IsNotExpiredDate } from 'src/decorators/validation/is-not-expired-date';
import { CreateCouponDto } from './create-coupon.dto';
import { CreateBuyXGetYDto } from './create-buy-x-get-y.dto';

export class CreateLoyaltyProgramDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  description: string;

  @IsNotEmpty()
  @IsDateString()
  @IsNotExpiredDate()
  //@Type(() => Date)
  expiresAt: Date;

  @IsNotEmpty()
  @IsEnum(['COUPON', 'BUY_X_GET_Y'], {
    message: 'type must be either COUPON or BUY_X_GET_Y',
  })
  type: 'COUPON' | 'BUY_X_GET_Y';

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  items: number;

  @ValidateIf((o) => o.type === 'COUPON')
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCouponDto)
  couponDiscount?: CreateCouponDto;

  @ValidateIf((o) => o.type === 'BUY_X_GET_Y')
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateBuyXGetYDto)
  buyXGetYDiscount?: CreateBuyXGetYDto;
}
