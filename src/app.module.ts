import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { RmqModule } from './rmq/rmq.module';
import { RmqService } from './rmq/rmq.service';
import { HELLO_SERVICE } from './constants/service';



@Module({
  imports: [
    RmqModule.register({
      name:HELLO_SERVICE,
    }),

  ],
  controllers: [AppController],
  providers: [AppService,ConfigService, RmqService],
})
export class AppModule {}
