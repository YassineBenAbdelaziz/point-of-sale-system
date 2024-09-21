import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { In, IsNull, Repository } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { Product } from '../product/entities/product.entity';
import { IPurchaseService } from './Ipurchase.service';
import { PaginationParams } from 'src/shared/classes/paginationParams';

@Injectable()
export class PurchaseService implements IPurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const { customerId, items } = createPurchaseDto;
    let customer = null;

    if (customerId) {
      customer = await this.customerRepository.findOne({
        where: { id: customerId },
      });
      if (!customer) {
        throw new NotFoundException(`Customer with id ${customerId} not found`);
      }
    }

    const productsIds = items.map((item) => item.productId);
    const products = await this.productRepository.find({
      where: { id: In(productsIds) },
    });

    const productsMap = new Map(
      products.map((product) => [product.id, product]),
    );

    for (const item of items) {
      const product = productsMap.get(item.productId);
      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }
      if (product.stock < item.quantity) {
        throw new NotFoundException(
          `Product with id ${item.productId} has insufficient stock`,
        );
      }
    }

    const purchase = await this.purchaseRepository.create({
      customer,
      items,
    });

    return await this.purchaseRepository.save(purchase);
  }

  async findAll(paginationParams: PaginationParams) {
    const { page, limit } = paginationParams;
    const [results, count] = await this.purchaseRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      count,
      data: results,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findOne(id: number) {
    const purchase = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.items', 'items')
      .leftJoin('items.product', 'product')
      .addSelect(['product.designation'])
      .where('purchase.id = :id', { id })
      .getOne();

    if (!purchase) {
      throw new NotFoundException(`Purchase with id ${id} not found`);
    }
    return purchase;
  }

  async remove(id: number) {
    const { affected } = await this.purchaseRepository.delete({
      id: id,
      invoice: IsNull(),
    });
    if (affected === 0) {
      throw new NotFoundException(
        `Purchase with id ${id} not found or already invoiced`,
      );
    }
    return;
  }
}
