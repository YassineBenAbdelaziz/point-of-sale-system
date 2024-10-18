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

  /**
   * Retrieves a discount code from the repository based on the provided code.
   *
   * @param code - The unique code of the discount to be retrieved.
   * @returns A promise that resolves to the DiscountCode object if found.
   */
  async findOne(code: string): Promise<DiscountCode> {
    return await this.discountCodesRepository.findOne({ where: { code } });
  }

  /**
   * Deactivates a list of discount codes by setting their `isActive` status to `false`.
   *
   * @param codes - An array of discount code strings to be deactivated.
   * @returns A promise that resolves when the discount codes have been updated.
   */
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
