import { Test, TestingModule } from '@nestjs/testing';
import { ProductFamilyService } from './product-family.service';

describe('ProductFamilyService', () => {
  let service: ProductFamilyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductFamilyService],
    }).compile();

    service = module.get<ProductFamilyService>(ProductFamilyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
