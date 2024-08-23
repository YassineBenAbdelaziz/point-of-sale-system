import { Injectable } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';

@Injectable()
export class PaymentTypeService {
  create(createPaymentTypeDto: CreatePaymentTypeDto) {
    return 'This action adds a new paymentType';
  }

  findAll() {
    return `This action returns all paymentType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentType`;
  }

  update(id: number, updatePaymentTypeDto: UpdatePaymentTypeDto) {
    return `This action updates a #${id} paymentType`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentType`;
  }
}
