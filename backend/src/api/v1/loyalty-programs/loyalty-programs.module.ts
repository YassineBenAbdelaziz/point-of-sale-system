import { Module } from '@nestjs/common';
import { LoyaltyProgramsService } from './loyalty-programs.service';
import { LoyaltyProgramsController } from './loyalty-programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoyaltyProgram } from './entities/loyalty-program.entity';
import { Coupon } from './entities/coupon.entity';
import { BuyX_GetY } from './entities/buy-x-get-y.entity';
import { DiscountCode } from './entities/discount-code.entity';
import { Product } from '../product/entities/product.entity';
import { DiscountService } from './discount.service';
import { CodeGeneratorModule } from 'src/services/code-generator/code-generator.module';

@Module({
  imports: [
    CodeGeneratorModule,
    TypeOrmModule.forFeature([
      LoyaltyProgram,
      Coupon,
      BuyX_GetY,
      DiscountCode,
      Product,
    ]),
  ],
  controllers: [LoyaltyProgramsController],
  providers: [
    {
      provide: 'ILoyaltyProgramService',
      useClass: LoyaltyProgramsService,
    },
    DiscountService,
  ],
  exports: [
    {
      provide: 'ILoyaltyProgramService',
      useClass: LoyaltyProgramsService,
    },
    DiscountService,
  ],
})
export class LoyaltyProgramsModule {}
