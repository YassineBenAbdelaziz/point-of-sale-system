import { Expose } from 'class-transformer';

export class EmployeeResponseDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  birthDate: Date;

  @Expose()
  cin: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  address: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
