import { Test, TestingModule } from '@nestjs/testing';
import { CustomerInvoiceService } from './customer-invoice.service';

describe('CustomerInvoiceService', () => {
  let service: CustomerInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerInvoiceService],
    }).compile();

    service = module.get<CustomerInvoiceService>(CustomerInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
