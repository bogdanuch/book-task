import { Module } from "@nestjs/common";
import { config } from "../typeorm.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { loadEnv } from "./config";
import { validate } from "./config/env";
import { nestLikeConsoleFormat } from "./common/utils/nest-like-console.format";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { BooksModule } from "./modules/books/books.module";

const configModuleOptions = {
  envFilePath: [".env"],
  isGlobal: true,
  load: [loadEnv],
  validate,
};

const winstonModuleOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const logLevel = configService.get<string>("log.level");

    return {
      level: logLevel,
      format: winston.format.combine(winston.format.timestamp(), nestLikeConsoleFormat({ isProductionMode: true })),
      transports: [new winston.transports.Console()],
    };
  },
};

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    WinstonModule.forRootAsync(winstonModuleOptions),
    TypeOrmModule.forRoot(config as TypeOrmModuleOptions),
    AuthModule,
    BooksModule,
    UsersModule,
  ],
})
export class AppModule {}
