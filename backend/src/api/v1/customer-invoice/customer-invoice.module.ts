import { Module } from '@nestjs/common';
import { CustomerInvoiceService } from './customer-invoice.service';
import { CustomerInvoiceController } from './customer-invoice.controller';

@Module({
  controllers: [CustomerInvoiceController],
  providers: [CustomerInvoiceService],
})
export class CustomerInvoiceModule {}
