import mongoose, { Schema, Document } from "mongoose";
import { ScreeningResult as IScreeningResult } from "@repo/shared";

export interface ScreeningResultDocument extends Omit<IScreeningResult, "id" | "jobId" | "applicantId">, Document {
  jobId: mongoose.Types.ObjectId;
  applicantId: mongoose.Types.ObjectId;
}

const ScreeningResultSchema: Schema = new Schema(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    applicantId: { type: Schema.Types.ObjectId, ref: "Applicant", required: true },
    rank: { type: Number, required: true },
    matchScore: { type: Number, required: true, min: 0, max: 100 },
    strengths: { type: [String], required: true },
    gapsRisks: { type: [String], required: true },
    finalRecommendation: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ScreeningResultDocument>("ScreeningResult", ScreeningResultSchema);
