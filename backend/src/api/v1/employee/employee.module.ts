import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Role])],
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'IEmployeeService',
      useClass: EmployeeService,
    },
  ],
  exports: [
    {
      provide: 'IEmployeeService',
      useClass: EmployeeService,
    },
  ],
})
export class EmployeeModule {}
