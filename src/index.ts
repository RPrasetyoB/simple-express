import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import * as dotenv from "dotenv";
import "reflect-metadata";
import router from "./routers";
import cors from "cors";
import errorCatch from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(express.json());

const { PORT } = process.env;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "welcome to rest api",
    version: "1.0.0",
  });
});

app.use(cors({ origin: "*" }));

app.use(router);

app.use(errorCatch);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("server running on: http//:localhost/" + PORT);
    });
    console.log("connected to database");
  })
  .catch(error => console.log(error));
