import { Router } from "express";
import {
   balance,
   depositMoney,
   transferMoney,
} from "../controllers/balance.controller.js";
import { isAuthenticated } from "../middlewares/user.auth.js";

const router = Router();

// router.post("/deposit", isAuthenticated, depositMoney);
router.get("/balance", isAuthenticated, balance);
router.post("/transfermoney", isAuthenticated, transferMoney);

export default router;
