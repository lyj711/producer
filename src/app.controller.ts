import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async SayHello(
    @Query('name') name: string,
  ): Promise<any> {
    return this.appService.sayHello(name);
  }


}
