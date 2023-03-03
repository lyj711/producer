import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('GREETING_SERVICE') private client: ClientProxy) {}

  getHello(): Observable<string> {
    return this.client.send(
      { cmd: 'greeting' }, 
      'Try Progressive Coder');
  }

  async getHelloAsync(): Promise<Observable<string>> {
    console.log('getHelloAsync');
    const message = await this.client.send(
      { cmd: 'greeting-async' },
      'Progressive Coder',
    );

    const promise = new Promise((resolve) => {
      message.subscribe((value) => {
        resolve(value);
      }); 
      this.client.
    });

    const messageValue = await promise;
    console.log('messageValue', messageValue);
    
    return message;
  }


  async publishEvent() {
    const value = await this.client.emit('add-token', {
      bookName: 'The Way Of Kings',
      author: 'Brandon Sanderson',
    });
    console.log('value', value);
  }
}
