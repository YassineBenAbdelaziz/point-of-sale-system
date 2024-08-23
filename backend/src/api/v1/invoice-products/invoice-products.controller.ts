import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceProductsService } from './invoice-products.service';
import { CreateInvoiceProductDto } from './dto/create-invoice-product.dto';
import { UpdateInvoiceProductDto } from './dto/update-invoice-product.dto';

@Controller('invoice-products')
export class InvoiceProductsController {
  constructor(private readonly invoiceProductsService: InvoiceProductsService) {}

  @Post()
  create(@Body() createInvoiceProductDto: CreateInvoiceProductDto) {
    return this.invoiceProductsService.create(createInvoiceProductDto);
  }

  @Get()
  findAll() {
    return this.invoiceProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceProductDto: UpdateInvoiceProductDto) {
    return this.invoiceProductsService.update(+id, updateInvoiceProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceProductsService.remove(+id);
  }
}
