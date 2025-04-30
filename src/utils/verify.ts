import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const verifyToken: RequestHandler = async (req, res, next) => {
  const token = req?.cookies?.token;

  if (!(typeof token === "string")) {
    res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
    return;
  }

  jwt.verify(token, config.secret as string, function (err: any, decoded: any) {
    if (err) {
      res.status(401).json({
        status: "failed",
        message: "Unauthorized",
      });
      return;
    }
    if (!(decoded.email === req.query.email)) {
      res.status(403).json({ status: "failed", message: "Forbidden" });
      return;
    }
    // console.log("passed");
    next();
  });
};
