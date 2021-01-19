// Using Promises without this module might cause file descriptor and memory leaks: https://github.com/mcollina/make-promises-safe
/*import 'make-promises-safe'

export default function main(): void {
    console.log("app started");
    setInterval(() => {
        console.log("ping");
    }, 1000);
};*/

import dotenv from "dotenv"
dotenv.config()

import app from "./app"
import { logger } from "./logger"

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    logger.info(`Running on port ${PORT}`)
})
