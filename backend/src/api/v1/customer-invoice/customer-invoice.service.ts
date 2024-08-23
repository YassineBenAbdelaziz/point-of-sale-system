import { Injectable } from '@nestjs/common';
import { CreateCustomerInvoiceDto } from './dto/create-customer-invoice.dto';
import { UpdateCustomerInvoiceDto } from './dto/update-customer-invoice.dto';

@Injectable()
export class CustomerInvoiceService {
  create(createCustomerInvoiceDto: CreateCustomerInvoiceDto) {
    return 'This action adds a new customerInvoice';
  }

  findAll() {
    return `This action returns all customerInvoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerInvoice`;
  }

  update(id: number, updateCustomerInvoiceDto: UpdateCustomerInvoiceDto) {
    return `This action updates a #${id} customerInvoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerInvoice`;
  }
}
