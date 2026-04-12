import { Router } from "express";
import multer from "multer";
import { ingestStructuredApplicant, getApplicantsByJob, uploadUnstructuredApplicant } from "../controllers/applicant.controller.js";

const router: Router = Router();
const upload = multer();

router.post("/structured", ingestStructuredApplicant);
router.post("/upload", upload.single("resume"), uploadUnstructuredApplicant);
router.get("/job/:jobId", getApplicantsByJob);

export default router;
