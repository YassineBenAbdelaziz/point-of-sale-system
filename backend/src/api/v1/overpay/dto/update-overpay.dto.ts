import { PartialType } from '@nestjs/mapped-types';
import { CreateOverpayDto } from './create-overpay.dto';

export class UpdateOverpayDto extends PartialType(CreateOverpayDto) {}
