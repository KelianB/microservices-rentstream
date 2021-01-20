import {Router} from "express";
import {streamingController} from "./controllers";
const router = Router();

router.use("/streaming", streamingController);

export default router;
