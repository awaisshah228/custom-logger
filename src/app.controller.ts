import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';
@Controller()
export class AppController {

  private readonly logger = new Logger();
  constructor(private readonly appService: AppService) {

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/open')
  open(): string {

    this.logger.log("open positon")
    return 'open';
  }
  @Get('/close')
  close(): string {
    this.logger.log("close")

    return 'close'
  }
  @Get('/error')
  error(): string {
    this.logger.error("error")

    return 'error'
  }
}
