import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { IsPastDate } from 'src/decorators/validation/is-past-date';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  @IsPastDate(18)
  birthDate: Date;

  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  cin: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 12)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  address: string;
}
