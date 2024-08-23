import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceProductsController } from './invoice-products.controller';
import { InvoiceProductsService } from './invoice-products.service';

describe('InvoiceProductsController', () => {
  let controller: InvoiceProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceProductsController],
      providers: [InvoiceProductsService],
    }).compile();

    controller = module.get<InvoiceProductsController>(InvoiceProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
