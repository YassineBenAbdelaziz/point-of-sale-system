import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyProgramsController } from './loyalty-programs.controller';
import { LoyaltyProgramsService } from './loyalty-programs.service';

describe('LoyaltyProgramsController', () => {
  let controller: LoyaltyProgramsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyProgramsController],
      providers: [LoyaltyProgramsService],
    }).compile();

    controller = module.get<LoyaltyProgramsController>(LoyaltyProgramsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
