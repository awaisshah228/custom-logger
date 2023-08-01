import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NewrelicInterceptor } from 'utils/newrelic.interceptor';
import { Logger } from 'nestjs-pino';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  app.useGlobalInterceptors(new NewrelicInterceptor());
  await app.listen(3000);
}
bootstrap();
