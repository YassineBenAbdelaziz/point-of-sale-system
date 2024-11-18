import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTypeController } from './payment-type.controller';
import { PaymentTypeService } from './payment-type.service';

describe('PaymentTypeController', () => {
  let controller: PaymentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentTypeController],
      providers: [PaymentTypeService],
    }).compile();

    controller = module.get<PaymentTypeController>(PaymentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
