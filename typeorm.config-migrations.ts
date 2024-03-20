import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import { config } from "./typeorm.config";
import { loadEnv } from "./src/config";

const envVariables = loadEnv();

export const typeOrmConfig = new DataSource({
  ...config,
  port: envVariables.db.exposedPort,
  host: "localhost",
} as DataSourceOptions);
