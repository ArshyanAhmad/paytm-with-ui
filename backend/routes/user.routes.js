import { Router } from "express";
import {
   filterUser,
   signIn,
   signUp,
   updateUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/user.auth.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", isAuthenticated, signIn);
router.post("/update", isAuthenticated, updateUser);
router.get("/bulk", filterUser);

export default router;
