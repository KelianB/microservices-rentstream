import * as express from "express";
import {createRental, getRentals} from "../controllers/renting.controller";
import {IRental} from "../models/rental.model";

const router = express.Router();

router.post("/test", async (req: express.Request, res: express.Response) => {
    res.status(200).json({test: "test"});
});

/**
 * Rent a movie for the authenticated user
 */
router.post("/rent", async (req: express.Request, res: express.Response) => {
    const {movieId, user} = req.body;
    if (!user) {
        res.status(401).json({error: "Please authenticate"});
    } else if (!movieId) {
        res.status(400).json({error: "Please specify movieId."});
    } else {
        console.log("Authenticated user: ");
        console.log(user);
        const rental: IRental = await createRental({userId: user.id, movieId});
        res.status(200).json({id: rental.id});
    }
});

/**
 * Get rentals of the authenticated user
 */
router.get("/", async (req: express.Request, res: express.Response) => {
    const {user} = req.body;
    if (!user) {
        res.status(401).json({error: "Please authenticate"});
    } else {
        console.log("Authenticated user: ");
        console.log(user);
        const rentals: IRental[] = await getRentals({userId: user.id});
        res.status(200).json({rentals});
    }
});

export default router;
