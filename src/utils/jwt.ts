import jwt from "jsonwebtoken";
import { config } from "../config";

export const generateJWTToken = (payload: any): string => {
  const token = jwt.sign(payload, config.secret as string, {
    expiresIn: 60 * 60 * 24,
  });

  return token;
};
