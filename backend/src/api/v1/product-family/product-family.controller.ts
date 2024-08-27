import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductFamilyService } from './product-family.service';
import { CreateProductFamilyDto } from './dto/create-product-family.dto';
import { UpdateProductFamilyDto } from './dto/update-product-family.dto';

@Controller('product-families')
export class ProductFamilyController {
  constructor(private readonly productFamilyService: ProductFamilyService) {}

  @Post()
  async create(@Body() createProductFamilyDto: CreateProductFamilyDto) {
    const family = await this.productFamilyService.create(
      createProductFamilyDto,
    );
    return {
      message: 'Product Family created successfully',
      statusCode: HttpStatus.CREATED,
      data: family,
    };
  }

  @Get()
  async findAll() {
    const families = await this.productFamilyService.findAll();
    return {
      message: 'Product Families fetched successfully',
      statusCode: HttpStatus.OK,
      data: families,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const family = await this.productFamilyService.findOne(id);
    return {
      message: 'Product Family fetched successfully',
      statusCode: HttpStatus.OK,
      data: family,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductFamilyDto: UpdateProductFamilyDto,
  ) {
    const updatedFamily = await this.productFamilyService.update(
      id,
      updateProductFamilyDto,
    );
    return {
      message: 'Product Family updated successfully',
      statusCode: HttpStatus.OK,
      data: updatedFamily,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productFamilyService.remove(id);
    return {
      message: 'Product Family deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
