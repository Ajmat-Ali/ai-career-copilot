import { Router } from "express";
import { sessionHandler } from "../controllers/auth/auth.controller";
import { refreshHandler } from "../controllers/auth/refresh.controller";
import { logoutHandler } from "../controllers/auth/logout.controller";

const router = Router();

router.post("/session", sessionHandler);
router.post("/refresh", refreshHandler);
router.post("/logout", logoutHandler);

export default router;
