import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerInvoiceDto } from './create-customer-invoice.dto';

export class UpdateCustomerInvoiceDto extends PartialType(CreateCustomerInvoiceDto) {}
