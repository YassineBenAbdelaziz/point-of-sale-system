import { Test, TestingModule } from '@nestjs/testing';
import { ProductFamilyController } from './product-family.controller';
import { ProductFamilyService } from './product-family.service';

describe('ProductFamilyController', () => {
  let controller: ProductFamilyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductFamilyController],
      providers: [ProductFamilyService],
    }).compile();

    controller = module.get<ProductFamilyController>(ProductFamilyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
