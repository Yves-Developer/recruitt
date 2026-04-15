import { Job, Applicant, ScreeningResult } from "@repo/shared";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  // Jobs
  async getJobs(): Promise<Job[]> {
    const res = await fetch(`${API_BASE_URL}/jobs`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
  },
  
  async createJob(jobData: Job): Promise<Job> {
    const res = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });
    if (!res.ok) throw new Error('Failed to create job');
    return res.json();
  },

  // Applicants
  async getApplicantsByJob(jobId: string): Promise<Applicant[]> {
    const res = await fetch(`${API_BASE_URL}/applicants/job/${jobId}`);
    if (!res.ok) throw new Error('Failed to fetch applicants');
    return res.json();
  },

  async createApplicantStructured(applicantData: Applicant): Promise<Applicant> {
    const res = await fetch(`${API_BASE_URL}/applicants/structured`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicantData),
    });
    if (!res.ok) throw new Error('Failed to create applicant');
    return res.json();
  },

  async uploadResume(formData: FormData): Promise<{ message: string; applicant: Applicant }> {
    const res = await fetch(`${API_BASE_URL}/applicants/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload resume');
    return res.json();
  },

  // Screening
  async triggerScreening(jobId: string): Promise<{ message: string; count: number }> {
    const res = await fetch(`${API_BASE_URL}/screening/trigger/${jobId}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to trigger screening');
    return res.json();
  },

  async getScreeningResults(jobId: string): Promise<ScreeningResult[]> {
    const res = await fetch(`${API_BASE_URL}/screening/results/${jobId}`);
    if (!res.ok) throw new Error('Failed to fetch screening results');
    return res.json();
  },

  async getAllRecentScreenings(): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/screening/recent`);
    if (!res.ok) throw new Error('Failed to fetch recent screenings');
    return res.json();
  },
};
