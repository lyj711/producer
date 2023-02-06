import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    // this.appService.publishEvent();
    const value = this.appService.getHelloAsync();
    // const value = this.appService.getHello();

    return value;
  }
}
