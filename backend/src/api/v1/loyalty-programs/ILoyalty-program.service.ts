import { PaginationParams } from 'src/shared/classes/paginationParams';
import { CreateLoyaltyProgramDto } from './dto/create/create-loyalty-program.dto';
import { LoyaltyProgram } from './entities/loyalty-program.entity';
import { PaginationResponse } from 'src/shared/interfaces/paginationResponse';
import { UpdateLoyaltyProgramDto } from './dto/update/update-loyalty-program.dto';

export interface ILoyaltyProgramService {
  create(
    createLoyaltyProgramDto: CreateLoyaltyProgramDto,
  ): Promise<LoyaltyProgram>;

  findAll(
    paginationParams: PaginationParams,
  ): Promise<PaginationResponse<LoyaltyProgram>>;

  findOne(id: number): Promise<LoyaltyProgram>;

  update(
    id: number,
    updateLoyaltyProgramDto: UpdateLoyaltyProgramDto,
  ): Promise<LoyaltyProgram>;

  remove(id: number): Promise<void>;

  findByDiscountCode(code: string): Promise<LoyaltyProgram>;
}
