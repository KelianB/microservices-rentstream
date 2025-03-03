import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import {logger} from "./logger";

const PORT = process.env.PORT || 3000;

// Start express server
app.listen(PORT, () => {
    logger.info(`Running on port ${PORT}`);
});
