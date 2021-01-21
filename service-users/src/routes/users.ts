import * as express from "express";
import {createUser} from "../controllers/user.controller";
import {IUser} from "../models/user.model";

const router = express.Router();

/**
 * Create a new user.
 */
router.post("/", async (req, res) => {
    const {email, firstName, lastName, dateOfBirth} = req.body;
    if (email && firstName && lastName && dateOfBirth) {
        const user: IUser = await createUser({email, firstName, lastName, dateOfBirth});
        res.status(200).json({id: user.id});
    } else {
        res.status(400).json({error: "Please specify an email, firstName, lastName and dateOfBirth."});
    }
});

/*
router.get("/users", (req, res) => {
    res.status(200).json(state.getUsers());
});

router.get("/users/:id", (req, res) => {
    const {id} = req.params;
    const user = state.getUser(id);
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({error: "User not found"});
    }
});

router.get("/users/:id/playlist", (req, res) => {
    const {id} = req.params;
    const user = state.getUser(id);
    if(user) {
        res.status(200).json(user.playlist);
    } else {
        res.status(404).json({error: "User not found"});
    }
});

router.put("/users/:id/playlist", (req, res) => {
    const {id} = req.params;
    const playlist = req.body as MediaCollection;
    const success = state.setUserPlaylist(id, playlist);
    if(success) {
        res.status(200).json(state.getUser(id));
    } else {
        res.status(404).json({error: "User not found"});
    }
});

router.get("/users/:id/suggestions", (req, res) => {
    const {id} = req.params;
    const user = state.getUser(id);
    if(user) {
        res.status(200).json(user.suggestions);
    } else {
        res.status(404).json({error: "User not found"});
    }
});

router.put("/users/:id/suggestions", (req, res) => {
    const {id} = req.params;
    const suggestions = req.body as MediaCollection;
    const success = state.setUserSuggestions(id, suggestions);
    if(success) {
        res.status(200).json(state.getUser(id));
    } else {
        res.status(404).json({error: "User not found"});
    }
});
*/
export default router;
