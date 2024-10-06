import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { IsNull, Repository } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { IPurchaseService } from './Ipurchase.service';
import { PaginationParams } from 'src/shared/classes/paginationParams';
import { IProductService } from '../product/Iproduct.service';
import { ICustomerService } from '../customer/Icustomer.service';
import { ILoyaltyProgramService } from '../loyalty-programs/ILoyalty-program.service';
import { DiscountService } from '../loyalty-programs/discount.service';
import { IPriceListService } from '../price-list/IPrice-list.service';
import { PurchaseItem } from '../purchase-items/entities/purchase-item.entity';
import { LoyaltyProgram } from '../loyalty-programs/entities/loyalty-program.entity';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { PurchaseResponse } from './dto/purchase.response';

@Injectable()
export class PurchaseService implements IPurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @Inject('IProductService')
    private readonly productService: IProductService,
    @Inject('ICustomerService')
    private readonly customerService: ICustomerService,
    @Inject('ILoyaltyProgramService')
    private readonly loyaltyProgramService: ILoyaltyProgramService,
    @Inject(DiscountService)
    private readonly discountService: DiscountService,
    @Inject('IPriceListService')
    private readonly priceListService: IPriceListService,
  ) {}

  /**
   * Creates a new purchase.
   *
   * This method follows a specific flow to ensure the purchase is valid:
   * 1. Checks if the customer exists.
   * 2. Verifies the existence and validity of buy X get Y codes (unique, active, not expired).
   * 3. Confirms the existence of products by their IDs.
   * 4. Creates a map for all products with their quantities.
   * 5. Checks if the products are available in stock (both originals and the minimum quantity for X and Y).
   * 6. Applies global and customer specific price lists.
   *
   * @param {CreatePurchaseDto} createPurchaseDto - The data transfer object containing purchase details.
   * @returns {Promise<PurchaseResponse>} - The response object containing the details of the created purchase.
   */
  async create(createPurchaseDto: CreatePurchaseDto) {
    const { customerId, items, buyX_getY_codes } = createPurchaseDto;

    const customer = await this.getCustomer(customerId);
    const purchaseItems = await this.createPurchaseItems(items);
    const programs = await this.getPrograms(buyX_getY_codes);

    const freeProducts = await this.applyDiscounts(
      purchaseItems,
      programs,
      buyX_getY_codes,
    );

    await this.applyPriceList(purchaseItems, customerId);

    const allItems = Array.from(purchaseItems.values()).concat(freeProducts);

    const purchaseEntity = await this.purchaseRepository.create({
      customer,
      items: allItems,
    });

    const purchase = await this.purchaseRepository.save(purchaseEntity);
    const plainPurchase = instanceToPlain(purchase);
    const purchaseResponse = plainToClass(PurchaseResponse, plainPurchase, {
      excludeExtraneousValues: true,
    });
    return purchaseResponse;
  }

  /**
   * Retrieves a paginated list of purchases.
   *
   * @param {PaginationParams} paginationParams - The pagination parameters.
   * @param {number} paginationParams.page - The current page number.
   * @param {number} paginationParams.limit - The number of items per page.
   * @returns {Promise<{ count: number, data: Purchase[], totalPages: number, currentPage: number }>}
   * An object containing the total count of purchases, the paginated data, the total number of pages,
   * and the current page number.
   */
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

  /**
   * Retrieves a purchase by its ID, including its associated items and their product designations.
   *
   * @param id - The ID of the purchase to retrieve.
   * @returns The purchase entity with its associated items and product designations.
   * @throws NotFoundException - If no purchase is found with the given ID.
   */
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

  /**
   * Removes a purchase entry by its ID if it has not been invoiced.
   *
   * @param id - The ID of the purchase to be removed.
   * @throws NotFoundException - If no purchase with the given ID is found or if the purchase has already been invoiced.
   * @returns A promise that resolves when the purchase is successfully removed.
   */
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

  /**
   * Retrieves a customer by their ID.
   *
   * @param customerId - The ID of the customer to retrieve.
   * @returns A promise that resolves to the customer if found, or null if not found.
   */
  private async getCustomer(customerId: number): Promise<Customer> | null {
    let customer = null;

    if (customerId) {
      customer = await this.customerService.findOne(customerId);
    }
    return customer;
  }

  /**
   * Retrieves loyalty programs based on the provided discount codes.
   *
   * @param codes - An array of discount codes to search for corresponding loyalty programs.
   * @returns A promise that resolves to an array of `LoyaltyProgram` objects.
   *
   * @throws {BadRequestException} If any of the programs have expired or if any of the discount codes have already been used.
   */
  private async getPrograms(codes: string[]): Promise<LoyaltyProgram[]> {
    if (!codes || codes.length === 0) return [];

    const programs =
      await this.loyaltyProgramService.findByDiscountCodes(codes);

    programs.forEach((program) => {
      const today = new Date();
      if (program.expiresAt < today)
        throw new BadRequestException('Program has expired');

      program.discountCodes.forEach((code) => {
        if (!code.isActive)
          throw new BadRequestException('Code has been already used');
      });
    });

    return programs;
  }

  /**
   * Creates a map of purchase items with their corresponding product details.
   *
   * @param items - An array of partial purchase items containing product IDs and quantities.
   * @returns A promise that resolves to a map where the key is the product ID and the value is the partial purchase item with product details.
   *
   * @throws {BadRequestException} If there are duplicate products in the purchase items.
   * @throws {NotFoundException} If any product has insufficient stock for the requested quantity.
   */
  private async createPurchaseItems(
    items: Partial<PurchaseItem>[],
  ): Promise<Map<number, Partial<PurchaseItem>>> {
    const productsIds = new Set<number>(items.map((item) => item.productId));

    if (productsIds.size !== items.length) {
      throw new BadRequestException('Duplicate products in purchase items');
    }

    const products = await this.productService.findByIds(
      Array.from(productsIds),
    );

    const productsMap = new Map(
      products.map((product) => [product.id, product]),
    );

    const cart = new Map<number, Partial<PurchaseItem>>(
      items.map((item) => {
        const product = productsMap.get(item.productId);
        return [
          item.productId,
          {
            product,
            quantity: item.quantity,
            adjustedPrice: product.price,
          },
        ];
      }),
    );

    cart.forEach((item, key) => {
      if (item.product.stock < item.quantity) {
        throw new NotFoundException(
          `Product with id ${key} has insufficient stock`,
        );
      }
    });

    return cart;
  }

  /**
   * Applies discounts to the purchase items based on the provided loyalty programs.
   *
   * @param purchaseItems - A map of purchase item IDs to their partial details.
   * @param programs - An array of loyalty programs to apply.
   * @param buyX_getY_codes - An array of discount codes to activate.
   * @returns A promise that resolves to an array of partially updated purchase items.
   * @throws {BadRequestException} If a required product is not in the cart or if the quantity is insufficient.
   */
  private async applyDiscounts(
    purchaseItems: Map<number, Partial<PurchaseItem>>,
    programs: LoyaltyProgram[],
    buyX_getY_codes: string[],
  ): Promise<Partial<PurchaseItem>[]> {
    if (programs.length === 0) return [];

    const newPurchaseItems = [];
    programs.forEach((program) => {
      const xProduct = purchaseItems.get(program.buyXGetY.xProductId);
      if (!xProduct) {
        throw new BadRequestException(
          `Cannot Redeem program ${program.name} as product "${program.buyXGetY.xProductId}" is not in cart`,
        );
      }

      const xQuantity =
        program.buyXGetY.xQuantity * program.discountCodes.length;
      if (xProduct.quantity < xQuantity) {
        throw new BadRequestException(
          `Cannot Redeem program ${program.name} as product "${xProduct.product.designation}" quantity is insufficient`,
        );
      }

      const yProduct = purchaseItems.get(program.buyXGetY.yProductId);
      if (!yProduct || yProduct.quantity < program.discountCodes.length) {
        throw new BadRequestException(
          `Cannot Redeem program as product "${program.buyXGetY.yProductId}" is not in cart or quantity is insufficient`,
        );
      }

      yProduct.quantity = Math.max(
        0,
        yProduct.quantity - program.discountCodes.length,
      );

      newPurchaseItems.push({
        productId: program.buyXGetY.yProductId,
        quantity: program.discountCodes.length,
        adjustedPrice: 0,
      });
    });

    await this.discountService.activateDiscountCodes(buyX_getY_codes);

    return newPurchaseItems;
  }

  /**
   * Applies the appropriate price list adjustments to the given purchase items for a specific customer.
   *
   * This method retrieves all valid price lists for the specified customer and adjusts the prices of the
   * purchase items based on the price list rules. If a purchase item meets the minimum quantity requirement
   * specified in the price list, its price is adjusted to the lower of the new price from the price list
   * or its current adjusted price.
   *
   * @param purchaseItems - A map of purchase item IDs to their corresponding partial purchase item details.
   * @param customerId - The ID of the customer for whom the price lists are being applied.
   * @returns A promise that resolves when the price adjustments have been applied.
   */
  private async applyPriceList(
    purchaseItems: Map<number, Partial<PurchaseItem>>,
    customerId: number,
  ): Promise<void> {
    const priceLists =
      await this.priceListService.findAllValidPriceListsForCustomer(customerId);

    priceLists.forEach((priceList) => {
      priceList.products.forEach((product) => {
        const purchaseItem = purchaseItems.get(product.productId);
        if (purchaseItem && purchaseItem.quantity >= product.minQuantity) {
          purchaseItem.adjustedPrice = Math.min(
            product.newPrice,
            purchaseItem.adjustedPrice,
          );
        }
      });
    });
  }
}
