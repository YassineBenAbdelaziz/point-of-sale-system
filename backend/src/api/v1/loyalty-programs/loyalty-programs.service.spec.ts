import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyProgramsService } from './loyalty-programs.service';

describe('LoyaltyProgramsService', () => {
  let service: LoyaltyProgramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoyaltyProgramsService],
    }).compile();

    service = module.get<LoyaltyProgramsService>(LoyaltyProgramsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
