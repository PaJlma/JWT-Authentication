import { IConfig } from "src/configuration/config";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const docsConfig = new DocumentBuilder()
    .setTitle("Authentication API")
    .setDescription("If you have questions - <a href=\"https://t.me/PaJlma\">My Telegram</a>")
    .setVersion("1.0.0")
    .setLicense("UNLICENSED", "")
    .setContact("PaJlma", "", "palma21042005@gmail.com")
    .build();

  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup("api/docs", app, document);

  const configService = app.get(ConfigService);

  const port = configService.get<IConfig>("app").port;
  await app.listen(port);

  console.log("Server run on port " + port);
}
bootstrap();
