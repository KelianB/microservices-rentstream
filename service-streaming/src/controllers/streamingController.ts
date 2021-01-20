import * as express from "express";
import _ from "lodash";

export const streamingController = express.Router();

streamingController.use(express.json());

