import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { ProductModule } from './api/v1/product/product.module';
import { CategoryModule } from './api/v1/category/category.module';
import { CustomerInvoiceModule } from './api/v1/customer-invoice/customer-invoice.module';
import { CustomerModule } from './api/v1/customer/customer.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
