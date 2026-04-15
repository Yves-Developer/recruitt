import mongoose, { Schema, Document } from "mongoose";
import { Applicant as IApplicant } from "@repo/shared";

export interface ApplicantDocument extends Omit<IApplicant, "id">, Document {}

const ApplicantSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    headline: { type: String, required: true },
    bio: { type: String },
    location: { type: String, required: true },
    skills: [
      {
        name: { type: String },
        level: { type: String },
        yearsOfExperience: { type: Number },
      },
    ],
    languages: [
      {
        name: { type: String },
        proficiency: { type: String },
      },
    ],
    experience: [
      {
        company: { type: String },
        role: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String },
        technologies: { type: [String], default: [] },
        isCurrent: { type: Boolean, default: false },
      },
    ],
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        startYear: { type: Number },
        endYear: { type: Number },
      },
    ],
    certifications: [
      {
        name: { type: String },
        issuer: { type: String },
        issueDate: { type: String },
      },
    ],
    projects: [
      {
        name: { type: String },
        description: { type: String },
        technologies: { type: [String], default: [] },
        role: { type: String },
        link: { type: String },
        startDate: { type: String },
        endDate: { type: String },
      },
    ],
    availability: {
      status: { type: String, default: "Open to Opportunities" },
      type: { type: String, default: "Full-time" },
      startDate: { type: String },
    },
    socialLinks: {
      linkedin: { type: String },
      github: { type: String },
      portfolio: { type: String },
    },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    resumeUrl: { type: String },
    source: { type: String, enum: ["umurava", "external"], default: "external" },
  },
  { timestamps: true }
);

// Email uniqueness per job applied
ApplicantSchema.index({ email: 1, jobId: 1 }, { unique: true });

export default mongoose.model<ApplicantDocument>("Applicant", ApplicantSchema);
