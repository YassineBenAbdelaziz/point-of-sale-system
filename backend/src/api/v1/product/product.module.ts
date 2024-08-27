import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { ProductFamily } from '../product-family/entities/product-family.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, ProductFamily])],
  controllers: [ProductController],
  providers: [
    {
      provide: 'IProductService',
      useClass: ProductService,
    },
  ],
})
export class ProductModule {}
