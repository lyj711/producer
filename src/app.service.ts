import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('GREETING_SERVICE') private client: ClientProxy) {}

  async getHello(): Promise<Observable<number>> {
    return this.client.send({ cmd: 'greeting' }, 'Try Progressive Coder');
  }

  getHelloAsync(): Observable<number> {
    console.log('getHelloAsync');
    const message = this.client.send(
      { cmd: 'greeting-async' },
      'Progressive Coder',
    );
    return message;
  }

  // async getHelloAsync() {
  //   const message = await this.client.send(
  //     { cmd: 'greeting-async' },
  //     'Progressive Coder',
  //   );
  //   return message;
  // }

  async publishEvent() {
    const value = this.client.emit('book-created', {
      bookName: 'The Way Of Kings',
      author: 'Brandon Sanderson',
    });
    console.log('value', value);
  }
}
