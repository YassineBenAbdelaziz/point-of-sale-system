import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateLoyaltyProgramDto } from './dto/create/create-loyalty-program.dto';
import { UpdateLoyaltyProgramDto } from './dto/update/update-loyalty-program.dto';
import { ILoyaltyProgramService } from './ILoyalty-program.service';
import { PaginationParams } from 'src/shared/classes/paginationParams';

@Controller('loyalty-programs')
export class LoyaltyProgramsController {
  constructor(
    @Inject('ILoyaltyProgramService')
    private readonly loyaltyProgramsService: ILoyaltyProgramService,
  ) {}

  @Post()
  async create(@Body() createLoyaltyProgramDto: CreateLoyaltyProgramDto) {
    const program = await this.loyaltyProgramsService.create(
      createLoyaltyProgramDto,
    );
    return {
      message: 'Loyalty program created',
      statusCode: HttpStatus.CREATED,
      data: program,
    };
  }

  @Get()
  async findAll(@Query() PaginationParams: PaginationParams) {
    const result = await this.loyaltyProgramsService.findAll(PaginationParams);
    return {
      message: 'Loyalty programs fetched',
      statusCode: HttpStatus.OK,
      ...result,
    };
  }

  @Get('discount-code/:code')
  async findByDiscountCode(@Param('code') code: string) {
    const program = await this.loyaltyProgramsService.findByDiscountCode(code);
    return {
      message: 'Loyalty program fetched',
      statusCode: HttpStatus.OK,
      data: program,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const program = await this.loyaltyProgramsService.findOne(id);
    return {
      message: 'Loyalty program fetched',
      statusCode: HttpStatus.OK,
      data: program,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLoyaltyProgramDto: UpdateLoyaltyProgramDto,
  ) {
    const updatedProgram = await this.loyaltyProgramsService.update(
      id,
      updateLoyaltyProgramDto,
    );
    return {
      message: 'Loyalty program updated',
      statusCode: HttpStatus.OK,
      data: updatedProgram,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.loyaltyProgramsService.remove(id);
    return {
      message: 'Loyalty program deleted',
      statusCode: HttpStatus.OK,
    };
  }
}
