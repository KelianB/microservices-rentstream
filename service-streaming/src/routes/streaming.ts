import axios from "axios";
import * as express from "express";

const router = express.Router();

const RENTAL_DURATION_MS = 1e3 * 3600 * 24 * 30;

router.get("/:movieId", async (req, res) => {
    const {movieId} = req.params;
    const {user} = req.body;
    if (!user) {
        res.status(401).json({error: "Please authenticate"});
    } else if (!movieId) {
        res.status(400).json({error: "Please specify movieId."});
    } else {
        // There is probably a way to pass the user object directly to renting:3000
        // instead of going through the gateway again...
        const resp = await axios.get("http://gateway:8080/renting", {
            headers: {
                Authorization: req.headers.authorization,
            },
        });

        if (resp.status === 200) {
            const rental = resp.data.rentals.find(
                (r) => r.movieId === movieId && new Date().getTime() - new Date(r.date).getTime() < RENTAL_DURATION_MS,
            );

            if (!rental) res.status(403).json({error: "User is not allowed to stream this movie."});
            else res.status(200).json({allowedToStream: true});
        } else res.status(500).json({error: "An error occurred while fetching rentals for this user."});
    }
});

export default router;
