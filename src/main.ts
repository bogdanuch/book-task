import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor, Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as express from "express";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: true,
  });
  app.use(cookieParser());
  app.use(
    session({
      secret: configService.get("AUTH_SESSION_SECRET"),
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true, httpOnly: true },
    }),
  );

  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder().addBearerAuth().setTitle(configService.get("APP_TITLE")).build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(configService.get("APP_PORT"));

  Logger.log(
    `You can access server on ${configService.get("APP_PROTOCOL")}://${configService.get(
      "APP_HOST",
    )}:${configService.get("APP_PORT")}`,
  );

  Logger.log(
    `You can access swagger on ${configService.get("APP_PROTOCOL")}://${configService.get(
      "APP_HOST",
    )}:${configService.get("APP_PORT")}/api`,
  );
}

bootstrap();
