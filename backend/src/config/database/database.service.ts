import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions() {
    const typeOrmOptions = {
      type: this.configService.getOrThrow('DB_TYPE'),
      host: this.configService.getOrThrow('DB_HOST'),
      port: this.configService.getOrThrow('DB_PORT'),
      username: this.configService.getOrThrow('DB_USER'),
      password: this.configService.getOrThrow('DB_PASS'),
      database: this.configService.getOrThrow('DB_NAME'),
      synchronize: false,
      autoLoadEntities: true,
    };

    return typeOrmOptions;
  }
}
