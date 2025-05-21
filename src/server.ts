import mongoose from "mongoose";
import { app } from "./app";
import { config } from "./config";

const main = async () => {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(config.port, () => {
      if (config.node_env === "development") {
        console.log(`Basha Koi chole ╰(°▽°)╯ on port ${config.port}`);
      }
    });
  } catch (error) {
    console.log("could not connect to DB ");
    if (config.node_env === "development") {
      console.log(error);
    }
  }
};

main();
