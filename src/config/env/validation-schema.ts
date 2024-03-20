import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class ValidationSchema {
  @IsNumberString()
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  APP_PROTOCOL: string;

  @IsString()
  @IsNotEmpty()
  APP_HOST: string;

  @IsString()
  @IsNotEmpty()
  APP_TITLE: string;

  @IsString()
  @IsNotEmpty()
  APP_DESCRIPTION: string;

  @IsString()
  @IsNotEmpty()
  LOG_LEVEL: string;

  @IsNumberString()
  POSTGRES_EXPOSED_TCP_PORT: number;

  @IsNumberString()
  POSTGRES_TCP_PORT: number;

  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USER: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DB: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsNumberString()
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: number;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsNumberString()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: number;

  @IsNumberString()
  BCRYPT_SALT_ROUNDS: number;

  @IsNumberString()
  ARGON2_TIME_COST: number;
}
