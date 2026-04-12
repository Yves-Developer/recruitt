import { Request, Response } from "express";
import Applicant from "../models/Applicant.js";
import { z } from "zod";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import { parseResumeTextToSchema } from "../services/resumeParser.js";

const applicantSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  headline: z.string().min(1),
  bio: z.string().optional(),
  location: z.string().min(1),
  skills: z.array(
    z.object({
      name: z.string().min(1),
      level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
      yearsOfExperience: z.number().min(0),
    })
  ).min(1),
  languages: z.array(
    z.object({
      name: z.string(),
      proficiency: z.enum(["Basic", "Conversational", "Fluent", "Native"]),
    })
  ).optional(),
  experience: z.array(
    z.object({
      company: z.string().min(1),
      role: z.string().min(1),
      startDate: z.string().min(1),
      endDate: z.string().optional(),
      description: z.string().min(1),
      technologies: z.array(z.string()).default([]),
      isCurrent: z.boolean(),
    })
  ).min(1),
  education: z.array(
    z.object({
      institution: z.string().min(1),
      degree: z.string().min(1),
      fieldOfStudy: z.string().min(1),
      startYear: z.number(),
      endYear: z.number().optional(),
    })
  ).min(1),
  certifications: z.array(
    z.object({
      name: z.string(),
      issuer: z.string(),
      issueDate: z.string(),
    })
  ).optional(),
  projects: z.array(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      technologies: z.array(z.string()).default([]),
      role: z.string().min(1),
      link: z.string().optional(),
      startDate: z.string().min(1),
      endDate: z.string().optional(),
    })
  ).min(1),
  availability: z.object({
    status: z.enum(["Available", "Open to Opportunities", "Not Available"]),
    type: z.enum(["Full-time", "Part-time", "Contract"]),
    startDate: z.string().optional(),
  }),
  socialLinks: z.object({
    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional(),
  }).optional(),
});

const ingestSchema = z.union([applicantSchema, z.array(applicantSchema)]);

export const ingestStructuredApplicant = async (req: Request, res: Response) => {
  try {
    const validatedData = ingestSchema.parse(req.body);
    
    // Normalize to array
    const applicantsToInsert = Array.isArray(validatedData) ? validatedData : [validatedData];

    // Using insertMany avoids repeating saves, sets unordered so unique conflicts don't crash whole batch
    const inserted = await Applicant.insertMany(applicantsToInsert, { ordered: false });
    
    res.status(201).json({
      message: `Successfully ingested ${inserted.length} applicant(s)`,
      applicants: inserted,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Validation error", errors: error.errors });
    } else if (error.code === 11000) {
      // Duplicate error
      res.status(409).json({ message: "One or more applicants already applied for this job (duplicate email)." });
    } else {
      res.status(500).json({ message: "Server error ingesting applicants", error: error.message });
    }
  }
};

export const getApplicantsByJob = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const applicants = await Applicant.find({ jobId }).sort({ createdAt: -1 });
    res.status(200).json(applicants);
  } catch (error: any) {
    res.status(500).json({ message: "Server error fetching applicants", error: error.message });
  }
};

export const uploadUnstructuredApplicant = async (req: Request, res: Response) => {
  const { jobId } = req.body;
  
  if (!jobId) {
    res.status(400).json({ message: "jobId is required in form-data" });
    return;
  }

  if (!req.file) {
    res.status(400).json({ message: "resume (PDF file) is required in form-data" });
    return;
  }

  try {
    // Determine the type, only PDF handled for basic Scenario 2 hackathon context
    if (req.file.mimetype !== 'application/pdf') {
       res.status(400).json({ message: "Only strictly PDF formats are supported currently." });
       return;
    }

    const data = await pdfParse(req.file.buffer);
    const rawText = data.text;
    
    // Parse unstructured raw text into the complex nested Umurava hackathon schema via Gemini
    const structuredData = await parseResumeTextToSchema(rawText);
    
    // Attach manual context
    const finalApplicant = new Applicant({
      ...structuredData,
      jobId
    });

    await finalApplicant.save();

    res.status(201).json({
      message: "Successfully parsed unstructured CV and mapped it to Talent Schema",
      applicant: finalApplicant
    });

  } catch (error: any) {
    res.status(500).json({ message: "Failed parsing and ingesting file via Gemini", error: error.message });
  }
};
