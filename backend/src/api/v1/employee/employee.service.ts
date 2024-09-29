import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IEmployeeService } from './IEmployee.service';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { EmployeeResponseDto } from './dto/emplyee.response.dto';

@Injectable()
export class EmployeeService implements IEmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(employeeDto: CreateEmployeeDto) {
    const employeeExist = await this.employeeRepository.findOne({
      where: [{ email: employeeDto.email }, { cin: employeeDto.cin }],
    });

    if (employeeExist) {
      if (employeeExist.email === employeeDto.email) {
        throw new BadRequestException('Email already exists');
      }

      throw new BadRequestException('CIN already exists');
    }

    try {
      const hashedPassword = await bcrypt.hash(employeeDto.password, 10);
      employeeDto.password = hashedPassword;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating employee, try again later',
      );
    }

    const newEmployee = await this.employeeRepository.save(employeeDto);

    const plainEmployee = instanceToPlain(newEmployee);
    const employeeResponse = plainToClass(EmployeeResponseDto, plainEmployee, {
      excludeExtraneousValues: true,
    });

    return employeeResponse;
  }

  async findByEmail(email: string) {
    const employee = await this.employeeRepository.findOne({
      where: { email },
    });
    return employee;
  }
}
