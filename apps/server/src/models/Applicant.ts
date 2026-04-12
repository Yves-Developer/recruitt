import mongoose, { Schema, Document } from 'mongoose';
import { Applicant as IApplicant } from '@repo/shared';

export interface ApplicantDocument extends Omit<IApplicant, 'id'>, Document {}

const ApplicantSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  experienceYears: { type: Number, required: true },
  skills: { type: [String], required: true },
  education: { type: String, required: true },
  resumeUrl: { type: String },
  profileData: { type: Schema.Types.Mixed }, // Structured talent profile
  screenings: [{
    jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
    rank: Number,
    matchScore: Number,
    strengths: [String],
    gaps: [String],
    recommendation: String,
    reasoning: String,
    screenedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model<ApplicantDocument>('Applicant', ApplicantSchema);
