import { Router } from "express";
import { triggerScreening, getScreeningResults, getAllRecentScreenings, updateScreeningStatus } from "../controllers/screening.controller.js";

const router: Router = Router();

router.post("/trigger/:jobId", triggerScreening);
router.get("/results/:jobId", getScreeningResults);
router.get("/recent", getAllRecentScreenings);
router.patch("/result/:id/status", updateScreeningStatus);

export default router;
