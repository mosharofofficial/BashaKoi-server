import mongoose from "mongoose";
import { app } from "./app";
import { config } from "./config";


const main = async ()=> {
    try {
        await mongoose.connect(config.db_url as string);
        app.listen(config.port, () => {
          console.log(`Basha Koi server listening on port ${config.port}`);
        });

    } catch (error) {
        console.log("could not connect to DB;")
    }
}

main();