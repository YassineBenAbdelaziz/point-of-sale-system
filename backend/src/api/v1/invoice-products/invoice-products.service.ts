import { Injectable } from '@nestjs/common';
import { CreateInvoiceProductDto } from './dto/create-invoice-product.dto';
import { UpdateInvoiceProductDto } from './dto/update-invoice-product.dto';

@Injectable()
export class InvoiceProductsService {
  create(createInvoiceProductDto: CreateInvoiceProductDto) {
    return 'This action adds a new invoiceProduct';
  }

  findAll() {
    return `This action returns all invoiceProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceProduct`;
  }

  update(id: number, updateInvoiceProductDto: UpdateInvoiceProductDto) {
    return `This action updates a #${id} invoiceProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceProduct`;
  }
}
