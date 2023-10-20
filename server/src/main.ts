import { IConfig } from 'src/configuration/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService);

  const port = configService.get<IConfig>("app").port;
  await app.listen(port);

  console.log("Server run on port " + port);
}
bootstrap();
