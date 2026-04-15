import { Request, Response } from "express";
import Job from "../models/Job.js";
import Applicant from "../models/Applicant.js";
import ScreeningResult from "../models/ScreeningResult.js";
import { screenCandidates } from "../services/geminiService.js";

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

export const getScreeningResults = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    // Populate the base candidate information alongside their AI-generated rank
    const results = await ScreeningResult.find({ jobId })
      .populate("applicantId")
      .sort({ rank: 1, matchScore: -1 });

    res.status(200).json(results);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch screening results", error: error.message });
  }
};

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
    );

    if (!result) {
      res.status(404).json({ message: "Screening result not found" });
      return;
    }

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};
