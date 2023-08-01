import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
import * as newrelic from 'newrelic';
import { Options } from 'pino-http';
import apmTransport from './apm-transport';


export const logger = pino({
  mixin() {
    return newrelic.getLinkingMetadata(false);
  },
  transport: {
    targets: [
      {
        target: './apm-transport',
        level: 'info',
        options: {
          apiKey: process.env.NEW_RELIC_LICENSE_KEY,
        },
      },
      {
        target: 'pino-pretty',
        level: 'trace',
        options: {
          colorize: true,
          singleLine: true,
        },
      },
    ],
  },
});

@Module({
  imports: [

    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        logger,
      } as Options,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
