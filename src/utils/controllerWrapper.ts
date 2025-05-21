import { RequestHandler } from "express";

export const controllerWrapper = (func: RequestHandler) => {
  const controller: RequestHandler = async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return controller;
};
