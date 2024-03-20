import * as process from "process";

export const loadEnv = () => ({
  mode: process.env.APP_MODE,
  db: {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_TCP_PORT),
    exposedPort: parseInt(process.env.POSTGRES_EXPOSED_TCP_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  log: {
    level: process.env.LOG_LEVEL,
  },
  jwt: {
    access: {
      expirationTimeSeconds: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
    },
    refresh: {
      expirationTimeSeconds: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
    },
    registration: {
      expirationTimeSeconds: parseInt(process.env.JWT_REGISTRATION_TOKEN_EXPIRATION_TIME),
    },
  },
  hashing: {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
    argon2TimeCost: parseInt(process.env.ARGON2_TIME_COST),
  },
});
