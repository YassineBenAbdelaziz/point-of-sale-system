import { CreateCustomerInvoiceDto } from './dto/create-customer-invoice.dto';
import { CustomerInvoice } from './entities/customer-invoice.entity';

export interface ICustomerInvoiceService {
  create(
    createCustomerInvoiceDto: CreateCustomerInvoiceDto,
  ): Promise<CustomerInvoice>;
}
