export * from './schemas';

export interface Applicant {
  id: string;
  name: string;
  email: string;
  experienceYears: number;
  skills: string[];
  education: string;
  resumeUrl?: string; // For Scenario 2
  profileData?: any; // For Scenario 1 (Umurava Schema)
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  experienceRequired: number;
}

export interface ScreeningResult {
  candidateId: string;
  rank: number;
  matchScore: number; // 0-100
  strengths: string[];
  gaps: string[];
  recommendation: string;
  reasoning: string;
}

export interface Shortlist {
  jobId: string;
  topCandidates: ScreeningResult[];
  createdAt: Date;
}
