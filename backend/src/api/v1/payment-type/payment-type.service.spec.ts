import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTypeService } from './payment-type.service';

describe('PaymentTypeService', () => {
  let service: PaymentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentTypeService],
    }).compile();

    service = module.get<PaymentTypeService>(PaymentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
