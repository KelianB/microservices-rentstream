import express from "express";
import * as bodyParser from "body-parser"; // used to parse the form data that you pass in the request
import router from "./routes/users";
import cors from "cors";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: false,
            }),
        );

        this.app.use("/users", router);
    }
}

export default new App().app;
