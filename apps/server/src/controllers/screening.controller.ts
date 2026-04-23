import { Request, Response } from "express";
import Job from "../models/Job.js";
import Applicant from "../models/Applicant.js";
import ScreeningResult from "../models/ScreeningResult.js";
import Notification from "../models/Notification.js";
import { screenCandidates } from "../services/geminiService.js";
import { getShortlistTemplate, getRejectTemplate } from "../utils/templates.js";

/**
 * Triggers the AI screening process for a specific job.
 * Fetches all applicants for the job, runs them through Gemini AI with weighted criteria,
 * and persists the results to the database.
 * 
 * @param {Request} req - Express request object containing jobId in params and weights in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const triggerScreening = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const { weights } = req.body;
  
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    const applicants = await Applicant.find({ jobId });
    if (applicants.length === 0) {
      res.status(400).json({ message: "No applicants found for this job" });
      return;
    }

    // Pass structured contextual context + user defined weights to Gemini Service
    const evaluations = await screenCandidates(job, applicants, weights);

    // Erase old evaluations for this job to allow reruns flawlessly
    await ScreeningResult.deleteMany({ jobId });

    // Prepare objects aligned with Mongo Schema
    const applicantIds = applicants.map(a => a._id.toString());
    const matchedEvaluations = evaluations.filter(ev => applicantIds.includes(ev.applicantId));

    if (matchedEvaluations.length === 0 && evaluations.length > 0) {
      console.error("Gemini hallucinated applicant IDs or failed to match them.");
      throw new Error("AI failed to link evaluations to candidates correctly. Please try again.");
    }

    const resultsToInsert = matchedEvaluations.map((ev) => ({
      jobId,
      applicantId: ev.applicantId,
      rank: ev.rank,
      matchScore: ev.matchScore,
      strengths: ev.strengths,
      gapsRisks: ev.gapsRisks,
      finalRecommendation: ev.finalRecommendation,
    }));

    await ScreeningResult.insertMany(resultsToInsert);

    res.status(200).json({
      message: "AI Screening completed successfully",
      count: resultsToInsert.length,
    });
  } catch (error: any) {
    console.error("AI Screening Error Detail:", error);
    res.status(500).json({ message: "AI Screening failed", error: error.message });
  }
};

/**
 * Retrieves all screening results for a specific job.
 * Results include populated applicant details and a flag for staged notifications.
 * 
 * @param {Request} req - Express request object containing jobId in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const getScreeningResults = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    // Populate the base candidate information alongside their AI-generated rank
    const results = await ScreeningResult.find({ jobId })
      .populate("applicantId")
      .sort({ rank: 1, matchScore: -1 });

    // Attach staged notification info
    const enrichedResults = await Promise.all(results.map(async (res) => {
      const stagedNote = await Notification.findOne({ screeningResultId: res._id, status: "staged" });
      return {
        ...res.toObject(),
        hasStagedNotification: !!stagedNote
      };
    }));

    res.status(200).json(enrichedResults);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch screening results", error: error.message });
  }
};

/**
 * Retrieves the 10 most recent screening results across all jobs.
 * Used for the global dashboard view.
 * 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const getAllRecentScreenings = async (req: Request, res: Response) => {
  try {
    const results = await ScreeningResult.find()
      .populate("applicantId")
      .populate("jobId", "title")
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.status(200).json(results);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch recent screenings", error: error.message });
  }
};

/**
 * Updates the status of a screening result (e.g., Shortlisted, Rejected).
 * Automatically generates a staged email notification if the status is Shortlisted or Rejected.
 * 
 * @param {Request} req - Express request object containing result ID in params and new status in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const updateScreeningStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["Evaluated", "Shortlisted", "Rejected", "Review later"];
  if (!validStatuses.includes(status)) {
    res.status(400).json({ message: "Invalid status value" });
    return;
  }

  try {
    const result = await ScreeningResult.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("applicantId").populate("jobId");

    if (!result) {
      res.status(404).json({ message: "Screening result not found" });
      return;
    }

    // Always clear existing staged notifications for this specific result when status changes
    await Notification.deleteMany({ screeningResultId: id, status: "staged" });

    // Auto-draft notifications if status is Shortlisted or Rejected
    if (status === "Shortlisted" || status === "Rejected") {
      const applicant = result.applicantId as any;
      const job = result.jobId as any;

      const content = status === "Shortlisted" 
        ? getShortlistTemplate(applicant.firstName, job.title)
        : getRejectTemplate(applicant.firstName, job.title);

      const subject = status === "Shortlisted"
        ? `Status Update: You've been shortlisted for ${job.title}`
        : `Application Update: ${job.title}`;

      await Notification.create({
        screeningResultId: id,
        jobId: job._id,
        recipientEmail: applicant.email,
        recipientName: `${applicant.firstName} ${applicant.lastName}`,
        subject,
        content,
        type: status === "Shortlisted" ? "shortlist" : "reject",
        status: "staged"
      });
    }

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};
