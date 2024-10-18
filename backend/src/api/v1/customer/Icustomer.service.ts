import { Customer } from './entities/customer.entity';

export interface ICustomerService {
  findOne(id: number): Promise<Customer>;
}
