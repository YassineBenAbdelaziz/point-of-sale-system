import { Module } from '@nestjs/common';
import { ProductFamilyService } from './product-family.service';
import { ProductFamilyController } from './product-family.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFamily } from './entities/product-family.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductFamily])],
  controllers: [ProductFamilyController],
  providers: [ProductFamilyService],
})
export class ProductFamilyModule {}
