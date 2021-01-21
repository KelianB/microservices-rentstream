import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import {connectToDatabase} from "./db";
import {logger} from "./logger";

const PORT = process.env.PORT || 3000;
const DB_CONFIG = {host: "database", port: "27017", database: "renting"};

// Connect to mongodb
connectToDatabase(DB_CONFIG).then(() => {
    // Start express server
    app.listen(PORT, () => {
        logger.info(`Running on port ${PORT}`);
    });
});
