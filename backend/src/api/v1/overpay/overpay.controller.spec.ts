import { Test, TestingModule } from '@nestjs/testing';
import { OverpayController } from './overpay.controller';
import { OverpayService } from './overpay.service';

describe('OverpayController', () => {
  let controller: OverpayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OverpayController],
      providers: [OverpayService],
    }).compile();

    controller = module.get<OverpayController>(OverpayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
