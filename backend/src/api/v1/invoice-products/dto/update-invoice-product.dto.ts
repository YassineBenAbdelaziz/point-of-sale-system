import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceProductDto } from './create-invoice-product.dto';

export class UpdateInvoiceProductDto extends PartialType(CreateInvoiceProductDto) {}
