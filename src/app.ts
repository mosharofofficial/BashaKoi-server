import express from "express";
import cors from "cors";
import { useRouters } from "./utils/useAllRouter";
import { AllRoutes } from "./routes/routes";
import globalErrorHandler from "./utils/errorHandling";
import cookieParser from "cookie-parser";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// app.get('/', (req, res)=>{
//   res.send("chole mama")
// })

app.use(cookieParser());
app.use(express.json());

useRouters(AllRoutes);

app.use(globalErrorHandler);