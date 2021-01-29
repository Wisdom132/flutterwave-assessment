import * as dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import Controller from "./Modules/interfaces/controller.interface";
import errorMiddleware from "./Modules/middleware/error.middleware";

import cors from "cors";
import helmet from "helmet";

class App {
  public app: Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    dotenv.config();
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}

export default App;
