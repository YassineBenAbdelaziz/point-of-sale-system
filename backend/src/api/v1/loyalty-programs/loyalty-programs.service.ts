import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLoyaltyProgramDto } from './dto/create/create-loyalty-program.dto';
import { UpdateLoyaltyProgramDto } from './dto/update/update-loyalty-program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LoyaltyProgram } from './entities/loyalty-program.entity';
import { Product } from '../product/entities/product.entity';
import { randomBytes } from 'crypto';
import { ILoyaltyProgramService } from './ILoyalty-program.service';
import { PaginationParams } from 'src/shared/classes/paginationParams';
import { DiscountCode } from './entities/discount-code.entity';

@Injectable()
export class LoyaltyProgramsService implements ILoyaltyProgramService {
  constructor(
    @InjectRepository(LoyaltyProgram)
    private readonly loyaltyProgramRepository: Repository<LoyaltyProgram>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(DiscountCode)
    private readonly discountCodesRepository: Repository<DiscountCode>,
  ) {}

  async create(createLoyaltyProgramDto: CreateLoyaltyProgramDto) {
    /*
     ***
     * Checks if type is buy x get Y
     * If yes, checks if x and y are existing in database
     * After, proceed to create codes for discounts
     * Save entities in database ;
     ***
     */

    const { type, items } = createLoyaltyProgramDto;
    if (type === 'BUY_X_GET_Y') {
      const { buyXGetYDiscount } = createLoyaltyProgramDto;
      const { xProductId, yProductId } = buyXGetYDiscount;
      const products = await this.productRepository.find({
        where: { id: In([xProductId, yProductId]) },
      });

      if (products.length !== 2) {
        throw new NotFoundException(
          'Products mentionned for discount are not found',
        );
      }
    }

    const codes = [];
    for (let i = 0; i < items; i++) {
      const temp = randomBytes(64).toString('hex').toUpperCase();
      const code =
        temp.slice(0, 4) + '-' + temp.slice(4, 8) + '-' + temp.slice(8, 12);
      codes.push(code);
    }

    const isExisting = await this.discountCodesRepository.exists({
      where: { code: In(codes) },
    });

    if (isExisting)
      throw new InternalServerErrorException(
        'Unable to generate unique codes, try again later',
      );

    const loyaltyProgram = this.loyaltyProgramRepository.create({
      ...createLoyaltyProgramDto,
      discountCodes: codes.map((code) => ({ code })),
      coupon:
        createLoyaltyProgramDto.type === 'COUPON'
          ? createLoyaltyProgramDto.couponDiscount
          : null,
      buyXGetY:
        createLoyaltyProgramDto.type === 'BUY_X_GET_Y'
          ? createLoyaltyProgramDto.buyXGetYDiscount
          : null,
    });

    return await this.loyaltyProgramRepository.save(loyaltyProgram);
  }

  async findAll(paginationParams: PaginationParams) {
    const { page, limit } = paginationParams;
    const [data, total] = await this.loyaltyProgramRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      count: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async findOne(id: number) {
    const loyaltyProgram = await this.loyaltyProgramRepository.findOne({
      where: { id },
      relations: ['discountCodes', 'buyXGetY', 'coupon'],
    });

    if (!loyaltyProgram) {
      throw new NotFoundException('Loyalty program not found');
    }

    return loyaltyProgram;
  }

  async update(id: number, updateLoyaltyProgramDto: UpdateLoyaltyProgramDto) {
    const loyaltyProgram = await this.loyaltyProgramRepository.findOne({
      where: { id },
    });

    if (!loyaltyProgram)
      throw new NotFoundException('Loyalty program not found');

    await this.loyaltyProgramRepository.update({ id }, updateLoyaltyProgramDto);
    return {
      ...loyaltyProgram,
      ...updateLoyaltyProgramDto,
    };
  }

  async remove(id: number) {
    const { affected } = await this.loyaltyProgramRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Loyalty program #${id} not found`);
    }
  }

  async findByDiscountCode(code: string) {
    const discountCode = await this.discountCodesRepository.findOne({
      where: { code },
      relations: [
        'loyaltyProgram',
        'loyaltyProgram.coupon',
        'loyaltyProgram.buyXGetY',
      ],
    });

    if (!discountCode) {
      throw new NotFoundException('Invalid Discount code');
    }

    return discountCode.loyaltyProgram;
  }

  async findByDiscountCodes(codes: string[]) {
    const loyaltyPrograms = await this.loyaltyProgramRepository
      .createQueryBuilder('loyaltyProgram')
      .leftJoinAndSelect('loyaltyProgram.discountCodes', 'discountCode')
      .leftJoinAndSelect('loyaltyProgram.coupon', 'coupon')
      .leftJoinAndSelect('loyaltyProgram.buyXGetY', 'buyXGetY')
      .where('discountCode.code IN (:...codes)', { codes })
      .getMany();

    const discountCodes = [];
    loyaltyPrograms.forEach((program) => {
      program.discountCodes.forEach((code) => discountCodes.push(code));
    });
    const codesMap = new Map(discountCodes.map((code) => [code.code, code]));

    for (const code of codes) {
      const discount = codesMap.get(code);
      if (!discount) {
        throw new NotFoundException(`Discount with code ${code} not found`);
      }
    }

    if (codes.length !== codesMap.size)
      throw new NotFoundException(`There was a duplicate discount code`);

    return loyaltyPrograms;
  }
}
