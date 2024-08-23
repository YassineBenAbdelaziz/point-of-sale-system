import { Module } from '@nestjs/common';
import { InvoiceProductsService } from './invoice-products.service';
import { InvoiceProductsController } from './invoice-products.controller';

@Module({
  controllers: [InvoiceProductsController],
  providers: [InvoiceProductsService],
})
export class InvoiceProductsModule {}
