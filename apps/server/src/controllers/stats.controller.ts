import { Request, Response } from "express";
import Applicant from "../models/Applicant.js";
import Job from "../models/Job.js";
import ScreeningResult from "../models/ScreeningResult.js";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalApplicants = await Applicant.countDocuments();
    const umuravaProfiles = await Applicant.countDocuments({ source: "umurava" });
    const externalResumes = await Applicant.countDocuments({ source: "external" });
    const shortlisted = await ScreeningResult.countDocuments({ matchScore: { $gte: 80 } });

    // Aggregate screening scores for chart (example: last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const screeningHistory = await ScreeningResult.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
          avgScore: { $avg: "$matchScore" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      summary: {
        totalJobs,
        totalApplicants,
        umuravaProfiles,
        externalResumes,
        shortlisted,
        explainabilityScore: 98.2 // Placeholder as this would be a system-wide metric
      },
      screeningHistory
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
