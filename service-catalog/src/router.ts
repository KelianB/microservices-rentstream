import {Router} from "express";
import {catalogController} from "./controllers";
const router = Router();

router.use("/catalog", catalogController);

export default router;
