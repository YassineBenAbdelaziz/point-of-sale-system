import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductFamilyService } from './product-family.service';
import { CreateProductFamilyDto } from './dto/create-product-family.dto';
import { UpdateProductFamilyDto } from './dto/update-product-family.dto';

@Controller('product-family')
export class ProductFamilyController {
  constructor(private readonly productFamilyService: ProductFamilyService) {}

  @Post()
  create(@Body() createProductFamilyDto: CreateProductFamilyDto) {
    return this.productFamilyService.create(createProductFamilyDto);
  }

  @Get()
  findAll() {
    return this.productFamilyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productFamilyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductFamilyDto: UpdateProductFamilyDto) {
    return this.productFamilyService.update(+id, updateProductFamilyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productFamilyService.remove(+id);
  }
}
