import { Module } from '@nestjs/common';
import { CustomerInvoiceService } from './customer-invoice.service';
import { CustomerInvoiceController } from './customer-invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerInvoice } from './entities/customer-invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerInvoice])],
  controllers: [CustomerInvoiceController],
  providers: [CustomerInvoiceService],
})
export class CustomerInvoiceModule {}
