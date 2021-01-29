import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    console.error(error);
    return response.status(400).json({
      message: "Invalid JSON payload passed.",
      status: "error",
      data: null,
    }); // Bad request
  } else {
    response.status(status).send({
      message,
      status,
    });
  }
}

export default errorMiddleware;
