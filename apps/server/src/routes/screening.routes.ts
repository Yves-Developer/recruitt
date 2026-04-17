import { Router } from "express";
import { triggerScreening, getScreeningResults, getAllRecentScreenings, updateScreeningStatus } from "../controllers/screening.controller.js";
import { getStagedNotifications, deleteNotification, sendAllStaged } from "../controllers/notification.controller.js";

const router: Router = Router();

router.post("/trigger/:jobId", triggerScreening);
router.get("/results/:jobId", getScreeningResults);
router.get("/recent", getAllRecentScreenings);
router.patch("/result/:id/status", updateScreeningStatus);

// Notification Staging & Bulk Send
router.get("/staged/:jobId", getStagedNotifications);
router.delete("/notification/:id", deleteNotification);
router.post("/send-staged/:jobId", sendAllStaged);

export default router;
