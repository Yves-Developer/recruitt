import { Request, Response } from "express";
import Job from "../models/Job.js";
import { z } from "zod";

const createJobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Location is required"),
  requirements: z.array(z.string()).min(1, "At least one requirement is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

export const createJob = async (req: Request, res: Response) => {
  try {
    const validatedData = createJobSchema.parse(req.body);
    const job = new Job({ ...validatedData, status: "open" });
    await job.save();
    res.status(201).json(job);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Validation error", errors: error.issues });
    } else {
      res.status(500).json({ message: "Server error creating job", error: error.message });
    }
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error: any) {
    res.status(500).json({ message: "Server error fetching jobs", error: error.message });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }
    res.status(200).json(job);
  } catch (error: any) {
    res.status(500).json({ message: "Server error fetching job", error: error.message });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }
    res.status(200).json(job);
  } catch (error: any) {
    res.status(500).json({ message: "Server error updating job", error: error.message });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error deleting job", error: error.message });
  }
};
