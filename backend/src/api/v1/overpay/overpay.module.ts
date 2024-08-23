import { Module } from '@nestjs/common';
import { OverpayService } from './overpay.service';
import { OverpayController } from './overpay.controller';

@Module({
  controllers: [OverpayController],
  providers: [OverpayService],
})
export class OverpayModule {}
