import { Module } from '@nestjs/common';
import { OverpayService } from './overpay.service';
import { OverpayController } from './overpay.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Overpay } from './entities/overpay.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Overpay])],
  controllers: [OverpayController],
  providers: [OverpayService],
})
export class OverpayModule {}
