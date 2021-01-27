import * as express from "express";
import {getPricing, setNewPrice} from "../controllers/pricing.controller";
import {createRental, getRentals} from "../controllers/renting.controller";
import {IPricing} from "../models/pricing.model";
import {IRental} from "../models/rental.model";

const router = express.Router();

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
        const rental: IRental = await createRental({userId: user.id, movieId, date: new Date()});
        res.status(200).json({movieId: rental.movieId, date: rental.date});
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
        const rentals = (await getRentals({userId: user.id})).map((r) => ({movieId: r.movieId, date: r.date}));
        res.status(200).json({rentals});
    }
});

/**
 * Set the price for a movie
 */
router.post("/price/:movieId", async (req: express.Request, res: express.Response) => {
    const {movieId} = req.params;
    const {price, user} = req.body;
    // This is where we would verify that the user is allowed to change prices
    if (!user) {
        res.status(401).json({error: "Please authenticate"});
    } else if (!movieId) {
        res.status(400).json({error: "Please specify movieId."});
    } else if (price === undefined) {
        res.status(400).json({error: "Please specify price."});
    } else {
        const pricing: IPricing = await setNewPrice({movieId, price});
        res.status(200).json({movieId: pricing.movieId, history: pricing.priceHistory});
    }
});

/**
 * Get the price of a movie
 */
router.get("/price/:movieId", async (req: express.Request, res: express.Response) => {
    const {movieId} = req.params;
    if (!movieId) {
        res.status(400).json({error: "Please specify movieId."});
    } else {
        const pricing: IPricing = await getPricing({movieId});
        if (pricing) {
            const history = pricing.priceHistory;
            res.status(200).json({movieId: pricing.movieId, price: history.length > 0 ? history[0] : 0});
        } else res.status(404).json({error: "This movie does not exist."});
    }
});

export default router;
