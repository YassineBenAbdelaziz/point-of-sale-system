import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateLoyaltyProgramDto } from '../create/create-loyalty-program.dto';

export class UpdateLoyaltyProgramDto extends PartialType(
  OmitType(CreateLoyaltyProgramDto, [
    'expiresAt',
    'items',
    'type',
    'couponDiscount',
    'buyXGetYDiscount',
  ]),
  { skipNullProperties: false },
) {}
