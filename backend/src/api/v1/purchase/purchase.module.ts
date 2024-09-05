import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Product } from '../product/entities/product.entity';
import { Customer } from '../customer/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Product, Customer])],
  controllers: [PurchaseController],
  providers: [
    {
      provide: 'IPurchaseService',
      useClass: PurchaseService,
    },
  ],
})
export class PurchaseModule {}
