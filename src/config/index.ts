import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  secret: process.env.SECRET,
  node_env: process.env.NODE_ENV,
  
};
