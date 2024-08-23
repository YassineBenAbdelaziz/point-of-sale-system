import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceProductsService } from './invoice-products.service';

describe('InvoiceProductsService', () => {
  let service: InvoiceProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceProductsService],
    }).compile();

    service = module.get<InvoiceProductsService>(InvoiceProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
