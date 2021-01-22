import * as express from "express";
import {Movie} from "../models/movie";
import movies from "./movies.json";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    return res.status(200).json({movies});
});

router.get("/:id", (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const movie = movies.find((movie: Movie) => movie.id === id);
    if (movie) return res.status(200).json(movie);
    else return res.status(404).json({error: "Movie not found"});
});

router.get("/search/:title", (req: express.Request, res: express.Response) => {
    const title = req.params.title;
    const movie = movies.find((movie: Movie) => movie.title === title);
    if (movie) return res.status(200).json(movie);
    else return res.status(404).json({error: "Movie not found"});
});

export default router;
