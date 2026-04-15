import { Router } from "express";
import { getDashboardStats } from "../controllers/stats.controller.js";

const router: Router = Router();

router.get("/", getDashboardStats);

export default router;
