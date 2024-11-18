import { Module } from '@nestjs/common';
import { CustomerInvoiceService } from './customer-invoice.service';
import { CustomerInvoiceController } from './customer-invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerInvoice } from './entities/customer-invoice.entity';
import { PurchaseModule } from '../purchase/purchase.module';
import { LoyaltyProgramsModule } from '../loyalty-programs/loyalty-programs.module';
import { PaymentTypeModule } from '../payment-type/payment-type.module';
import { CodeGeneratorModule } from 'src/services/code-generator/code-generator.module';

@Module({
  imports: [
    PurchaseModule,
    PaymentTypeModule,
    LoyaltyProgramsModule,
    CodeGeneratorModule,
    TypeOrmModule.forFeature([CustomerInvoice]),
  ],
  controllers: [CustomerInvoiceController],
  providers: [
    {
      provide: 'ICustomerInvoiceService',
      useClass: CustomerInvoiceService,
    },
  ],
})
export class CustomerInvoiceModule {}
