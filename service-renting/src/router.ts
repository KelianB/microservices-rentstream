import {Router} from "express";
import {rentingController} from "./controllers";
const router = Router();

router.use("/renting", rentingController);

export default router;
