import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceListDto } from './dto/create-price-list.dto';
import { UpdatePriceListDto } from './dto/update-price-list.dto';
import { IPriceListService } from './IPrice-list.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceList } from './entities/price-list.entity';
import { In, Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { PaginationParams } from 'src/shared/classes/paginationParams';

@Injectable()
export class PriceListService implements IPriceListService {
  constructor(
    @InjectRepository(PriceList)
    private readonly priceListRepository: Repository<PriceList>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createPriceListDto: CreatePriceListDto) {
    const productIds = createPriceListDto.products.map((e) => e.productId);
    const products = await this.productRepository.find({
      where: {
        id: In(productIds),
      },
    });

    if (products.length !== createPriceListDto.products.length)
      throw new NotFoundException('Some products are not found or duplicates');

    return await this.priceListRepository.save(createPriceListDto);
  }

  async findAll(paginationParams: PaginationParams) {
    const { page, limit } = paginationParams;
    const [result, total] = await this.priceListRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      count: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async findOne(id: number) {
    const priceList = await this.priceListRepository.findOne({ where: { id } });

    if (!priceList) throw new NotFoundException(`Price List ${id} Not Found`);

    return priceList;
  }

  async update(id: number, updatePriceListDto: UpdatePriceListDto) {
    const priceList = await this.priceListRepository.findOne({
      where: { id },
    });

    if (!priceList) throw new NotFoundException(`Price List ${id} not found`);

    if (updatePriceListDto.products) {
      const productIds = updatePriceListDto.products.map((e) => e.productId);
      const products = await this.productRepository.find({
        where: {
          id: In(productIds),
        },
      });

      if (products.length !== updatePriceListDto.products.length)
        throw new NotFoundException(
          'Some products are not found or duplicates',
        );
    }

    return await this.priceListRepository.save({
      id,
      ...updatePriceListDto,
    });
  }

  async remove(id: number) {
    const { affected } = await this.priceListRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Price List #${id} not found`);
    }
  }

  async findAllValidPriceListsForCustomer(customerId?: number) {
    const today = new Date();
    const query = this.priceListRepository
      .createQueryBuilder('priceList')
      .leftJoin(
        'customers_price_lists',
        'customer',
        'customer."priceListsId" = priceList.id',
      )
      .leftJoinAndSelect('priceList.products', 'product')
      .where('priceList.expiresAt > :today', { today })
      .andWhere('customer.customersId is Null ');

    if (customerId)
      query.orWhere('(customer.customersId = :customerId )', { customerId });

    return await query.getMany();
  }
}
