import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminRouter from "./admin";
import configRouter from "./config";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/config", configRouter);
router.use("/admin", adminRouter);
router.use("/contact", contactRouter);

export default router;
