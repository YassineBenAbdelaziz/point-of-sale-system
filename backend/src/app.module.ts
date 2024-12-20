import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { ProductModule } from './api/v1/product/product.module';
import { CategoryModule } from './api/v1/category/category.module';
import { CustomerInvoiceModule } from './api/v1/customer-invoice/customer-invoice.module';
import { CustomerModule } from './api/v1/customer/customer.module';
import { PaymentsModule } from './api/v1/payments/payments.module';
import { PaymentTypeModule } from './api/v1/payment-type/payment-type.module';
import { OverpayModule } from './api/v1/overpay/overpay.module';
import { InvoiceProductsModule } from './api/v1/purchase-items/purchase-tem.module';
import { PurchaseModule } from './api/v1/purchase/purchase.module';
import { PriceListModule } from './api/v1/price-list/price-list.module';
import { LoyaltyProgramsModule } from './api/v1/loyalty-programs/loyalty-programs.module';
import { EmployeeModule } from './api/v1/employee/employee.module';
import { AuthModule } from './api/v1/auth/auth.module';
import { CodeGeneratorModule } from './services/code-generator/code-generator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProductModule,
    CategoryModule,
    CustomerInvoiceModule,
    CustomerModule,
    PaymentsModule,
    PaymentTypeModule,
    OverpayModule,
    InvoiceProductsModule,
    PurchaseModule,
    PriceListModule,
    LoyaltyProgramsModule,
    EmployeeModule,
    AuthModule,
    CodeGeneratorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
