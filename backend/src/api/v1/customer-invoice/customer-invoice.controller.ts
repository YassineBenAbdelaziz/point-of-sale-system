import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CustomerInvoiceService } from './customer-invoice.service';
import { CreateCustomerInvoiceDto } from './dto/create-customer-invoice.dto';
import { UpdateCustomerInvoiceDto } from './dto/update-customer-invoice.dto';
import { ICustomerInvoiceService } from './Icustomer-invoice.service';

@Controller('customer-invoice')
export class CustomerInvoiceController {
  constructor(
    @Inject('ICustomerInvoiceService')
    private readonly customerInvoiceService: ICustomerInvoiceService,
  ) {}

  @Post()
  create(@Body() createCustomerInvoiceDto: CreateCustomerInvoiceDto) {
    return this.customerInvoiceService.create(createCustomerInvoiceDto);
  }

  /*
  @Get()
  findAll() {
    return this.customerInvoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerInvoiceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerInvoiceDto: UpdateCustomerInvoiceDto,
  ) {
    return this.customerInvoiceService.update(+id, updateCustomerInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerInvoiceService.remove(+id);
  }
    */
}
