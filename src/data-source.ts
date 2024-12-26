import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import * as dotenv from "dotenv";
import { Todo } from "./entity/Todo";

dotenv.config();

const { DB_HOST, DB_NAME, DB_PORT, DB_PASSWORD, DB_USER } = process.env;
export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT) || 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Todo],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
