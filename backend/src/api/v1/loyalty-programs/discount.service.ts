import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountCode } from './entities/discount-code.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscountCode)
    private readonly discountCodesRepository: Repository<DiscountCode>,
  ) {}

  async activateDiscountCodes(codes: string[]) {
    this.discountCodesRepository.update(
      {
        code: In(codes),
      },
      {
        isActive: false,
      },
    );
  }
}
