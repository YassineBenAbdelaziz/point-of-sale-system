import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Product } from '../product/entities/product.entity';
import { Customer } from '../customer/entities/customer.entity';
import { LoyaltyProgramsModule } from '../loyalty-programs/loyalty-programs.module';
import { PriceListModule } from '../price-list/price-list.module';
import { ProductModule } from '../product/product.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    ProductModule,
    CustomerModule,
    LoyaltyProgramsModule,
    PriceListModule,
    TypeOrmModule.forFeature([Purchase, Product, Customer]),
  ],
  controllers: [PurchaseController],
  providers: [
    {
      provide: 'IPurchaseService',
      useClass: PurchaseService,
    },
  ],
})
export class PurchaseModule {}
