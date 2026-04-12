/**
 * Talent Profile Schema (Based on Umurava requirements)
 * This is used for Scenario 1: Screening Applicants from the Umurava Platform
 */
export interface TalentProfile {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  professionalSummary: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationYear: number;
  }[];
  certifications?: string[];
  languages: string[];
}
