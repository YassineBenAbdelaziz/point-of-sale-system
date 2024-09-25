import { BaseEntity } from 'src/shared/entities/base-entity';
import { OneToMany } from 'typeorm';
import { Employee } from './employee.entity';

export class Role extends BaseEntity {
  name: string;
  description: string;

  @OneToMany(() => Employee, (employee) => employee.role)
  employees: Employee[];
}
