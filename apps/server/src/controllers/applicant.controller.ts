import { Request, Response } from "express";
import Applicant from "../models/Applicant.js";
import { z } from "zod";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { parseResumeTextToSchema, parseBulkDataToSchema } from "../services/resumeParser.js";

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
    const applicantsToInsert = Array.isArray(validatedData) ? validatedData : [validatedData];
    const inserted = await Applicant.insertMany(applicantsToInsert, { ordered: false });
    res.status(201).json({
      message: `Successfully ingested ${inserted.length} applicant(s)`,
      applicants: inserted,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Validation error", errors: error.errors });
    } else if (error.code === 11000) {
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
  if (!jobId || !req.file) {
    res.status(400).json({ message: "jobId and resume file are required." });
    return;
  }

  try {
    if (req.file.mimetype !== 'application/pdf') {
       res.status(400).json({ message: "Only strictly PDF formats are supported currently." });
       return;
    }

    // Use the modern fork which behaves better in ESM
    const pdf = require("pdf-parse-fork");
    const parseFn = typeof pdf === 'function' ? pdf : (pdf.default || pdf);
    
    const data = await parseFn(req.file.buffer);
    const rawText = data.text;
    console.log("------------------- RAW PDF EXTRACTION START -------------------");
    console.log(rawText.substring(0, 1500) + (rawText.length > 1500 ? "..." : ""));
    console.log("------------------- RAW PDF EXTRACTION END ---------------------");
    console.log(`[Upload] PDF Text Extracted (${rawText.length} chars). Mapping via Gemini 2.5 Flash-Lite...`);
    
    const structuredData = await parseResumeTextToSchema(rawText);
    const finalApplicant = new Applicant({ ...structuredData, jobId });
    await finalApplicant.save();

    res.status(201).json({
      message: "Successfully parsed unstructured CV and mapped it to Talent Schema",
      applicant: finalApplicant
    });

  } catch (error: any) {
    console.error("[Upload Error]", error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: "AI failed to extract required fields perfectly.", details: error.message });
      return;
    }
    res.status(500).json({ message: "Failed parsing and ingesting file via Gemini", error: error.message });
  }
};

export const uploadBulkApplicants = async (req: Request, res: Response) => {
  const { jobId } = req.body;
  if (!jobId || !req.file) {
    res.status(400).json({ message: "jobId and file are required." });
    return;
  }

  try {
    const XLSX = require("xlsx");
    let rawData = "";
    const filename = req.file.originalname.toLowerCase();

    if (filename.endsWith('.csv')) {
      rawData = req.file.buffer.toString('utf-8');
    } else if (filename.endsWith('.xlsx')) {
      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      rawData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
    } else {
      res.status(400).json({ message: "Unsupported file type. Please use .csv or .xlsx" });
      return;
    }

    const structuredApplicants = await parseBulkDataToSchema(rawData);
    if (!Array.isArray(structuredApplicants)) throw new Error("AI failed to return an array of applicants");

    const applicantsToInsert = structuredApplicants.map(a => ({ ...a, jobId }));
    const inserted = await Applicant.insertMany(applicantsToInsert, { ordered: false });

    res.status(201).json({
      message: `Successfully ingested ${inserted.length} applicants from ${filename}`,
      count: inserted.length
    });

  } catch (error: any) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ message: "Failed to process bulk upload", error: error.message });
  }
};
