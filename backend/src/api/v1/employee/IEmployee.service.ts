import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeResponseDto } from './dto/emplyee.response.dto';
import { Employee } from './entities/employee.entity';

export interface IEmployeeService {
  create(employee: CreateEmployeeDto): Promise<EmployeeResponseDto>;
  findByEmail(email: string): Promise<Employee | null>;
}
