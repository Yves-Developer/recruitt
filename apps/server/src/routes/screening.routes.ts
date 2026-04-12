import { Router } from "express";
import { triggerScreening, getScreeningResults } from "../controllers/screening.controller.js";

const router: Router = Router();

router.post("/trigger/:jobId", triggerScreening);
router.get("/results/:jobId", getScreeningResults);

export default router;
