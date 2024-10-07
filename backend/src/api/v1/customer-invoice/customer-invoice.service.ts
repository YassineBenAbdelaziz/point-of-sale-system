import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCustomerInvoiceDto } from './dto/create-customer-invoice.dto';
import { UpdateCustomerInvoiceDto } from './dto/update-customer-invoice.dto';
import { ICustomerInvoiceService } from './Icustomer-invoice.service';
import { IPurchaseService } from '../purchase/Ipurchase.service';
import { ILoyaltyProgramService } from '../loyalty-programs/ILoyalty-program.service';
import { LoyaltyProgram } from '../loyalty-programs/entities/loyalty-program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerInvoice } from './entities/customer-invoice.entity';
import { Repository } from 'typeorm';
import { PaymentTypeService } from '../payment-type/payment-type.service';
import { DiscountService } from '../loyalty-programs/discount.service';
import { Overpay } from '../overpay/entities/overpay.entity';
import { CodeGeneratorService } from 'src/services/code-generator/code-generator.service';

@Injectable()
export class CustomerInvoiceService implements ICustomerInvoiceService {
  constructor(
    @Inject('IPurchaseService')
    private readonly purchaseService: IPurchaseService,
    @Inject('ILoyaltyProgramService')
    private readonly loyaltyProgramService: ILoyaltyProgramService,
    @InjectRepository(CustomerInvoice)
    private readonly customerInvoiceRepository: Repository<CustomerInvoice>,
    @Inject(PaymentTypeService)
    private readonly paymentTypeService: PaymentTypeService,
    @Inject(DiscountService)
    private readonly discountService: DiscountService,
    @Inject(CodeGeneratorService)
    private readonly codeGeneratorService: CodeGeneratorService,
  ) {}

  /**
   * Creates a new customer invoice.
   *
   * @param {CreateCustomerInvoiceDto} createCustomerInvoiceDto - The data transfer object containing the details for creating a customer invoice.
   * @returns {Promise<CustomerInvoice>} The created customer invoice.
   * @throws {BadRequestException} If the purchase already has an invoice.
   * @throws {BadRequestException} If the discount code is not a coupon.
   * @throws {BadRequestException} If the discount code has expired.
   * @throws {BadRequestException} If the discount code has already been used.
   * @throws {BadRequestException} If the amount paid is not enough to cover the new price.
   */
  async create(createCustomerInvoiceDto: CreateCustomerInvoiceDto) {
    const { purchaseId, discount_code, payments } = createCustomerInvoiceDto;
    const purchase = await this.purchaseService.findOne(purchaseId);

    if (purchase.invoiceId)
      throw new BadRequestException('Purchase already has an invoice');

    let program: LoyaltyProgram | null = null;
    if (discount_code !== '') {
      program =
        await this.loyaltyProgramService.findByDiscountCode(discount_code);

      if (program.type !== 'COUPON')
        throw new BadRequestException(
          `Discount code ${discount_code} is not a coupon`,
        );

      const today = new Date();
      if (program.expiresAt < today)
        throw new BadRequestException(
          `Discount code ${discount_code} has expired`,
        );

      if (!program.discountCodes[0].isActive)
        throw new BadRequestException(
          `Discount code ${discount_code} already used`,
        );
    }

    const paymentTypesIds = payments.map((p) => p.paymentTypeId);

    await this.paymentTypeService.findByIds(paymentTypesIds);

    let price = 0;
    purchase.items.forEach((item) => {
      price += item.adjustedPrice * item.quantity;
    });

    let newPrice = price;
    if (program) newPrice = price - price * program.coupon.percentage;

    let payedAmount = 0;
    payments.forEach((payment) => {
      payedAmount += payment.price;
    });

    let overpay = 0;
    if (payedAmount < newPrice)
      throw new BadRequestException('Not enough money payed');
    else if (payedAmount > newPrice) overpay = payedAmount - newPrice;

    let overpayEntity: Partial<Overpay> | null = null;

    if (overpay) {
      const today = new Date();

      overpayEntity = {
        amount: overpay,
        dueDate: new Date(today.setMonth(today.getMonth() + 3)),
        used: false,
      };
    }

    const invoice = this.customerInvoiceRepository.create({
      price,
      purchase,
      payments,
      discount: program ? program.coupon.percentage : 0,
      overpay: overpayEntity,
    });

    if (discount_code !== '')
      await this.discountService.activateDiscountCodes([discount_code]);

    return await this.customerInvoiceRepository.save(invoice);
  }

  findAll() {
    return `This action returns all customerInvoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerInvoice`;
  }

  update(id: number, updateCustomerInvoiceDto: UpdateCustomerInvoiceDto) {
    return `This action updates a #${id} customerInvoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerInvoice`;
  }
}
