import mongoose, { Schema, Document } from "mongoose";
import { Job as IJob } from "@repo/shared";

export interface JobDocument extends Omit<IJob, "id">, Document {}

const JobSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    skills: { type: [String], required: true },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<JobDocument>("Job", JobSchema);
