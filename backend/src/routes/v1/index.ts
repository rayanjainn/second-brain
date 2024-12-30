import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import brainRouter from "./brain";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/brain", brainRouter);

export default router;
