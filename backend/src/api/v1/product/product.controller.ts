import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductService } from './Iproduct.service';
import { PaginationParams } from 'src/shared/classes/paginationParams';

@Controller('products')
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() paginationParams: PaginationParams) {
    const results = await this.productService.findAll(paginationParams);
    return {
      message: 'Products fetched successfully',
      statusCode: HttpStatus.OK,
      ...results,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.findOne(id);
    return {
      message: 'Product fetched successfully',
      statusCode: HttpStatus.OK,
      data: product,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.update(
      id,
      updateProductDto,
    );
    return {
      message: 'Product updated successfully',
      statusCode: HttpStatus.OK,
      data: updatedProduct,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productService.remove(id);
    return {
      message: 'Product deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
