import express from "express";
import cors from "cors";
import { useRouters } from "./utils/useAllRouter";
import { AllRoutes } from "./routes/routes";
import globalErrorHandler from "./utils/errorHandling";
import cookieParser from "cookie-parser";

export const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(globalErrorHandler);

useRouters(AllRoutes);
