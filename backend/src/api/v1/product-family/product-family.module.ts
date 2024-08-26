import { Module } from '@nestjs/common';
import { ProductFamilyService } from './product-family.service';
import { ProductFamilyController } from './product-family.controller';

@Module({
  controllers: [ProductFamilyController],
  providers: [ProductFamilyService],
})
export class ProductFamilyModule {}
