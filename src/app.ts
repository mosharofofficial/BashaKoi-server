import express from "express";
import cors from "cors";
import { useRouters } from "./utils/useAllRouter";
import { AllRoutes } from "./routes/routes";
import globalErrorHandler from "./utils/errorHandling";
export const app = express();

app.use(cors());
app.use(express.json());
useRouters(AllRoutes);
app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send("Basha Koi chole ╰(°▽°)╯");
});
