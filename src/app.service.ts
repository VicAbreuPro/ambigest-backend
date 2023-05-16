import { Injectable } from '@nestjs/common';

// Test comment
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
