import { Router } from "express";
import { triggerScreening, getScreeningResults, getAllRecentScreenings } from "../controllers/screening.controller.js";

const router: Router = Router();

router.post("/trigger/:jobId", triggerScreening);
router.get("/results/:jobId", getScreeningResults);
router.get("/recent", getAllRecentScreenings);

export default router;
