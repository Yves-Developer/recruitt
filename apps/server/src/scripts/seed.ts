import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/Job.js";
import Applicant from "../models/Applicant.js";
import ScreeningResult from "../models/ScreeningResult.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/recruitt";

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    // Clear existing data
    console.log("Clearing existing data...");
    await Job.deleteMany({});
    await Applicant.deleteMany({});
    await ScreeningResult.deleteMany({});

    // Create Sample Jobs
    console.log("Seeding jobs...");
    const jobs = await Job.insertMany([
      {
        title: "Senior Fullstack Engineer",
        description: "Looking for a seasoned pro to lead our Next.js and Node.js initiatives.",
        requirements: ["5+ years of experience with modern frameworks", "Strong cloud knowledge", "Leadership skills"],
        skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
        status: "open",
        location: "Kigali (Hybrid)"
      },
      {
        title: "Product Designer (UI/UX)",
        description: "Join our creative team to shape the future of talent profiles.",
        requirements: ["Portfolio demonstrating clean aesthetics", "Experience solving complex UX problems"],
        skills: ["Figma", "Auto Layout", "Design Systems", "Prototyping"],
        status: "open",
        location: "Remote"
      }
    ]);

    const jobId = jobs[0]?._id;
    if (!jobId) throw new Error("Failed to seed jobs - no ID returned");

    // Create Sample Applicants for the first job
    console.log("Seeding applicants...");
    await Applicant.insertMany([
      {
        jobId,
        firstName: "Alice",
        lastName: "Umuhoza",
        email: "alice@example.com",
        headline: "Passionate Fullstack Developer",
        bio: "Highly skilled developer with focus on performance and clean code.",
        location: "Kigali, Rwanda",
        skills: [
          { name: "React", level: "Expert", yearsOfExperience: 6 },
          { name: "Node.js", level: "Advanced", yearsOfExperience: 4 }
        ],
        experience: [
          {
            company: "Tech Kigali",
            role: "Senior Dev",
            startDate: "2020-01",
            description: "Led the migration to microservices.",
            isCurrent: true,
            technologies: ["Docker", "Kubernetes"]
          }
        ],
        education: [
          { institution: "UR CST", degree: "Bachelor's", fieldOfStudy: "Computer Science", startYear: 2015 }
        ],
        projects: [
          { name: "Recruitt AI", description: "This hackathon project.", role: "Lead", startDate: "2024-03" }
        ],
        availability: { status: "Available", type: "Full-time" }
      },
      {
        jobId,
        firstName: "Bob",
        lastName: "Mutabazi",
        email: "bob@example.com",
        headline: "Junior Developer",
        bio: "Eager to learn and grow in a fast-paced environment.",
        location: "Gisenyi, Rwanda",
        skills: [
          { name: "React", level: "Beginner", yearsOfExperience: 1 },
          { name: "JavaScript", level: "Intermediate", yearsOfExperience: 2 }
        ],
        experience: [
          {
            company: "Soft Solutions",
            role: "Intern",
            startDate: "2023-01",
            description: "Fixed bugs in existing codebase.",
            isCurrent: false,
            technologies: ["React", "CSS"]
          }
        ],
        education: [
          { institution: "ALU", degree: "Bachelor's", fieldOfStudy: "Software Engineering", startYear: 2019 }
        ],
        projects: [
          { name: "My Portfolio", description: "Personal site.", role: "Creator", startDate: "2023-06" }
        ],
        availability: { status: "Open to Opportunities", type: "Full-time" }
      },
      {
        jobId,
        firstName: "Sarah",
        lastName: "Mugisha",
        email: "sarah@example.com",
        headline: "Backend Specialist",
        bio: "Specialist in scalable Node.js architectures.",
        location: "Kigali, Rwanda",
        skills: [
          { name: "Node.js", level: "Expert", yearsOfExperience: 7 },
          { name: "MongoDB", level: "Advanced", yearsOfExperience: 5 }
        ],
        experience: [
          {
            company: "Global Scale",
            role: "Backend Architect",
            startDate: "2018-05",
            description: "Architected a system handling 1M users.",
            isCurrent: true,
            technologies: ["Redis", "RabbitMQ"]
          }
        ],
        education: [
          { institution: "MIT", degree: "Master's", fieldOfStudy: "Computer Science", startYear: 2015 }
        ],
        projects: [
          { name: "Scalable API", description: "Open source framework.", role: "Author", startDate: "2020-01" }
        ],
        availability: { status: "Not Available", type: "Contract" }
      }
    ]);

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
