import { Module } from '@nestjs/common';
import { InvoiceProductsService } from './invoice-products.service';
import { InvoiceProductsController } from './invoice-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceProduct } from './entities/invoice-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceProduct])],
  controllers: [InvoiceProductsController],
  providers: [InvoiceProductsService],
})
export class InvoiceProductsModule {}
