import mongoose, { Schema, Document } from "mongoose";

export interface NotificationDocument extends Document {
  screeningResultId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  content: string; // HTML content
  status: "staged" | "sent" | "cancelled";
  type: "shortlist" | "reject";
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema = new Schema(
  {
    screeningResultId: { type: Schema.Types.ObjectId, ref: "ScreeningResult", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    recipientEmail: { type: String, required: true },
    recipientName: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ["staged", "sent", "cancelled"], default: "staged" },
    type: { type: String, enum: ["shortlist", "reject"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<NotificationDocument>("Notification", NotificationSchema);
