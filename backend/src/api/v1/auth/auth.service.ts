import { Inject, Injectable } from '@nestjs/common';
import { IEmployeeService } from '../employee/IEmployee.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IEmployeeService')
    private readonly employeeService: IEmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.employeeService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user?.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
