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
        name: { type: String, required: true },
        level: { type: String, required: true },
        yearsOfExperience: { type: Number, required: true },
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
        company: { type: String, required: true },
        role: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String },
        description: { type: String, required: true },
        technologies: { type: [String], default: [] },
        isCurrent: { type: Boolean, required: true },
      },
    ],
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        startYear: { type: Number, required: true },
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
        name: { type: String, required: true },
        description: { type: String, required: true },
        technologies: { type: [String], default: [] },
        role: { type: String, required: true },
        link: { type: String },
        startDate: { type: String, required: true },
        endDate: { type: String },
      },
    ],
    availability: {
      status: { type: String, required: true },
      type: { type: String, required: true },
      startDate: { type: String },
    },
    socialLinks: {
      linkedin: { type: String },
      github: { type: String },
      portfolio: { type: String },
    },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    resumeUrl: { type: String },
  },
  { timestamps: true }
);

// Email uniqueness per job applied could be a good idea, but here we'll just index it
ApplicantSchema.index({ email: 1, jobId: 1 }, { unique: true });

export default mongoose.model<ApplicantDocument>("Applicant", ApplicantSchema);
