import * as express from "express";
import _ from "lodash";
import movies from "../../movies.json";

export const catalogController = express.Router();

catalogController.use(express.json());

catalogController.get("/", (req: express.Request, res: express.Response) => {
    return res.status(200).json(movies);
});

catalogController.get("/:id", (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const movie = movies.find((movie) => movie.id === id);
    return res.status(200).json(movie);
});

catalogController.get("/search/:title", (req: express.Request, res: express.Response) => {
    const title = req.params.title;
    const movie = movies.find((movie) => movie.title === title);
    return res.status(200).json(movie);
});