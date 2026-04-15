import { Router } from "express";
import multer from "multer";
import { ingestStructuredApplicant, getApplicantsByJob, uploadUnstructuredApplicant, uploadBulkApplicants } from "../controllers/applicant.controller.js";

const router: Router = Router();
const upload = multer();

router.post("/structured", ingestStructuredApplicant);
router.post("/upload", upload.single("resume"), uploadUnstructuredApplicant);
router.post("/bulk", upload.single("file"), uploadBulkApplicants);
router.get("/job/:jobId", getApplicantsByJob);

export default router;
