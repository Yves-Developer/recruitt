export * from "./schemas";
import { TalentProfile } from "./schemas";

export interface Job {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  status?: "open" | "closed";
  location: string;
}

export interface Applicant extends TalentProfile {
  _id?: string;
  id?: string;
  jobId: string; // The job they applied for
  resumeUrl?: string; // If unstructured upload
}

export interface ScreeningResult {
  _id?: string;
  id?: string;
  jobId: string;
  applicantId: string;
  rank: number;
  matchScore: number;
  strengths: string[];
  gapsRisks: string[];
  finalRecommendation: string;
}
