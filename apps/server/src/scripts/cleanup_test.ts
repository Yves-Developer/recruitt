import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../../.env") });

async function cleanup() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found");
    return;
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB for cleanup...");

  const db = mongoose.connection.db;
  if (!db) return;

  const email = "yvesmugisha09@gmail.com";
  const jobId = "69df5edfaff59e8ea25be323";

  // Delete applicants matching email and jobId
  const applicantDelete = await db.collection("applicants").deleteMany({ 
    email: email,
    jobId: new mongoose.Types.ObjectId(jobId) 
  });
  
  // Also delete any existing screening results for this applicant
  const resultsDelete = await db.collection("screeningresults").deleteMany({
    applicantId: { $in: await db.collection("applicants").find({ email }).map(a => a._id).toArray() }
  });

  console.log(`Successfully deleted ${applicantDelete.deletedCount} applicant(s).`);
  console.log(`Successfully deleted associated screening results.`);

  await mongoose.disconnect();
  process.exit(0);
}

cleanup();
