import * as express from "express";
import {createUser} from "../controllers/renting.controller";
import {IUser} from "../models/user.model";

const router = express.Router();

// TODO change
router.post("/", async (req, res) => {
    const {email, firstName, lastName, dateOfBirth} = req.body;
    if (email && firstName && lastName && dateOfBirth) {
        const user: IUser = await createUser({email, firstName, lastName, dateOfBirth});
        res.status(200).json({id: user.id});
    } else {
        res.status(400).json({error: "Please specify an email, firstName, lastName and dateOfBirth."});
    }
});

export default router;
