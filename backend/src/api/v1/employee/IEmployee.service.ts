import { Employee } from './entities/employee.entity';

export interface IEmployeeService {
  findByEmail(email: string): Promise<Employee | null>;
}
