import { RequestHandler } from "express";

export const isRole = (role: "owner" | "tenant") => {
  const check: RequestHandler = (req, res, next) => {
    if (req.decoded?.role === role) {
      next();
    } else {
      // console.log("not role");
      res.json({
        status: 403,
        message: "Forbidden Request",
      });
    }
  };
  return check;
};
