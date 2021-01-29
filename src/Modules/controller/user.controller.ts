import User from "../interfaces/user.interface";
import { Router, Request, Response, NextFunction } from "express";
import Controller from "../interfaces/controller.interface";
import user from "../data/user.json";

import fs from "fs";
import path from "path";

class UserController implements Controller {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getUserData);
  }

  private getUserData = async (req: Request, res: Response) => {
    fs.readFile(path.join(__dirname, "../data/user.json"), (err, data: any) => {
      if (err) throw err;
      let userDetails: User = JSON.parse(data);
      res.json({
        message: "My Rule-Validation API",
        status: "success",
        data: userDetails,
      });
    });
  };
}

export default UserController;
