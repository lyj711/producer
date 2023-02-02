import { Bind, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }


  accumulate(): any {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return this.client.send(pattern, payload);
  }

  // used to publish event
  // async publish() {
  //   this.client.emit('user_created', new UserCreatedEvent());
  // }

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Bind(Payload(), Ctx())
  @MessagePattern('notifications')
  getNotifications(data, context) {
    console.log(`Pattern: ${context.getPattern()}`);
  }
}
