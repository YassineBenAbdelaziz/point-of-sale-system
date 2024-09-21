import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseItem } from './entities/purchase-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseItem])],
  controllers: [],
  providers: [],
})
export class InvoiceProductsModule {}
