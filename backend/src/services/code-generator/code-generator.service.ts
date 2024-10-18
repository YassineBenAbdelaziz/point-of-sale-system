import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class CodeGeneratorService {
  /**
   * Generates a unique code consisting of three segments separated by hyphens.
   * Each segment is a substring of a randomly generated hexadecimal string.
   *
   * @returns {string} A unique code in the format XXXX-XXXX-XXXX.
   */
  generateCode(): string {
    const temp = randomBytes(64).toString('hex').toUpperCase();
    const code =
      temp.slice(0, 4) + '-' + temp.slice(4, 8) + '-' + temp.slice(8, 12);

    return code;
  }

  /**
   * Generates an array of unique codes.
   *
   * @param count - The number of codes to generate.
   * @returns An array of generated codes.
   */
  generateCodes(count: number): string[] {
    const codes: string[] = [];

    for (let i = 0; i < count; i++) {
      codes.push(this.generateCode());
    }

    return codes;
  }
}
