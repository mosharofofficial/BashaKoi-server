import { NextFunction, Request, Response } from "express";
import { config } from "../config";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (config.node_env === "development") {
    console.error(err.stack);
    res.json(err);
  } else {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

export default globalErrorHandler;
