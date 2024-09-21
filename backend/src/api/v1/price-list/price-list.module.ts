import { Module } from '@nestjs/common';
import { PriceListService } from './price-list.service';
import { PriceListController } from './price-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceList } from './entities/price-list.entity';
import { PriceListProduct } from './entities/price-list-product';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PriceList, PriceListProduct, Product])],
  controllers: [PriceListController],
  providers: [
    {
      provide: 'IPriceListService',
      useClass: PriceListService,
    },
  ],
})
export class PriceListModule {}
