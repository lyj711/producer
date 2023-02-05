import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqService } from './rmq.service';

interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [RmqService, ConfigService],
  exports: [RmqService],
})
export class RmqModule {
  //name of service what want to register
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        // we want to use ClientsModule to register a RabbitMQ service
        ClientsModule.registerAsync([
          {
            name,
            // define how to connect to service
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: name,
              },
            }),
            inject: [ConfigService],
          },
        ]),
        
      ],
      // export ClientsModule with things defined above
      exports: [ClientsModule],
    };
  }
}
