import "dotenv/config";
import { loadEnv } from "./src/config";

const envVariables = loadEnv();

export const config = {
  type: "postgres",
  host: envVariables.db.host,
  port: envVariables.db.port,
  database: envVariables.db.database,
  username: envVariables.db.username,
  password: envVariables.db.password,
  schema: "public",
  entities: [__dirname + "/src/**/{*.entity,enums}.{js,ts}"],
  migrations: [__dirname + "/src/database/migrations/*.{js,ts}"],
  synchronize: false,
  migrationsRun: true,
  retryAttempts: 3,
  retryDelay: 5000,
  logging: true,
};
