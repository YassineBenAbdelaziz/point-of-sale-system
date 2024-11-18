import { Injectable } from '@nestjs/common';
import { CreateOverpayDto } from './dto/create-overpay.dto';
import { UpdateOverpayDto } from './dto/update-overpay.dto';

@Injectable()
export class OverpayService {
  create(createOverpayDto: CreateOverpayDto) {
    return 'This action adds a new overpay';
  }

  findAll() {
    return `This action returns all overpay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} overpay`;
  }

  update(id: number, updateOverpayDto: UpdateOverpayDto) {
    return `This action updates a #${id} overpay`;
  }

  remove(id: number) {
    return `This action removes a #${id} overpay`;
  }
}
