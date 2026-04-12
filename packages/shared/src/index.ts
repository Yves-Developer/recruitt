export * from "./schemas";
import { TalentProfile } from "./schemas";

export interface Job {
  id?: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  status?: "open" | "closed";
}

export interface Applicant extends TalentProfile {
  id?: string;
  jobId: string; // The job they applied for
  resumeUrl?: string; // If unstructured upload
}

export interface ScreeningResult {
  id?: string;
  jobId: string;
  applicantId: string;
  rank: number;
  matchScore: number;
  strengths: string[];
  gapsRisks: string[];
  finalRecommendation: string;
}
