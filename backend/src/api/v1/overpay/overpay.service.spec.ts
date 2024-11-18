import { Test, TestingModule } from '@nestjs/testing';
import { OverpayService } from './overpay.service';

describe('OverpayService', () => {
  let service: OverpayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OverpayService],
    }).compile();

    service = module.get<OverpayService>(OverpayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
