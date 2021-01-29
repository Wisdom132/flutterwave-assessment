import express, { Application, Request, Response, NextFunction } from "express";

const customResponses = (res: Response) => {
  let requiredFieldValidation = (field: string) => {
    return res.status(400).json({
      message: `${field} should be a|an [type].`,
      status: "error",
      data: null,
    });
  };
};

export default { customResponses };
