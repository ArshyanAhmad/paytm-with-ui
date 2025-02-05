import { Router } from "express";
import userRoutes from "./user.routes.js";
import balanceRoutes from "./balance.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/account", balanceRoutes);

export default router;
