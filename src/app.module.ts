import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.CLOUDAMQP_URL],
          queue: 'cats_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
