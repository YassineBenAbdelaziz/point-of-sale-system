import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentType } from './entities/payment-type.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectRepository(PaymentType)
    private readonly paymentTypeRepository: Repository<PaymentType>,
  ) {}

  create(createPaymentTypeDto: CreatePaymentTypeDto) {
    return 'This action adds a new paymentType';
  }

  findAll() {
    return `This action returns all paymentType`;
  }

  async findByIds(ids: number[]) {
    const paymentTypes = await this.paymentTypeRepository.find({
      where: { id: In(ids) },
    });

    const paymentTypesSet = new Set(paymentTypes.map((p) => p.id));

    if (paymentTypes.length !== paymentTypesSet.size) {
      throw new BadRequestException(
        'Payments types does not exist or not unique',
      );
    }

    return paymentTypes;
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
