import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private arr = [];
  getHello(): string {
    const length = this.arr.length + 1;
    for (let i = 0; i < length; i++) {
      this.arr.push(i);
    }
    return 'Hello World!';
  }
}
