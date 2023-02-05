import { Bind, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, Payload } from '@nestjs/microservices';
import { HELLO_SERVICE } from './constants/service';

@Injectable()
export class AppService {

  constructor(
    @Inject(HELLO_SERVICE) private client: ClientProxy,
  ) {}
  
  async sayHello(name:string): Promise<any>{
    try {
      return await this.client.send("Hello", name);
    } catch (error) {
      console.log(error);
    }
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }


}
