import { GoogleGenerativeAI } from "@google/generative-ai";
import { JobDocument } from "../models/Job.js";
import { ApplicantDocument } from "../models/Applicant.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key_if_missing");

export interface GeminScreeningOutput {
  applicantId: string;
  rank: number;
  matchScore: number;
  strengths: string[];
  gapsRisks: string[];
  finalRecommendation: string;
}

export const screenCandidates = async (
  job: JobDocument,
  applicants: ApplicantDocument[]
): Promise<GeminScreeningOutput[]> => {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("WARNING: GEMINI_API_KEY is not set. The screening service will fail until configured.");
  }

  // Using gemini-1.5-flash as it's the recommended speedy model for these tasks
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Map to just the data we need so we don't blow up the context window
  const mappedApplicants = applicants.map(a => ({
    id: a._id.toString(),
    headline: a.headline,
    skills: a.skills.map(s => `${s.name} (${s.level}) - ${s.yearsOfExperience}y`),
    experience: a.experience.map(e => `${e.role} at ${e.company} (${e.startDate} to ${e.endDate || 'present'}) - ${e.description}`),
    education: a.education?.map(e => `${e.degree} in ${e.fieldOfStudy} at ${e.institution}`) || [],
    certifications: a.certifications?.map(c => c.name) || [],
    projects: a.projects?.map(p => `${p.name} - ${p.description}`) || []
  }));

  const prompt = `
    You are an expert HR recruitment assistant. 
    Analyze the following job description and the list of applicants.
    Rank the applicants based on their suitability for the role.
    
    Job Description:
    ${JSON.stringify({
    title: job.title,
    description: job.description,
    requirements: job.requirements,
    skills: job.skills
  })}
    
    Applicants:
    ${JSON.stringify(mappedApplicants)}
    
    Return a strictly valid JSON array of objects with the exact following schema:
    [
      {
        "applicantId": "applicant id string (must perfectly match 'id' field passed in)",
        "rank": number (1 is best),
        "matchScore": number (0-100),
        "strengths": ["string"],
        "gapsRisks": ["string"],
        "finalRecommendation": "string"
      }
    ]
    
    Focus on:
    - Skill relevance
    - Total years of experience vs required
    - Specific strengths and potential risks (gapsRisks)
  `;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      // Force native JSON response
      responseMimeType: "application/json",
    }
  });

  const responseText = result.response.text();

  try {
    const jsonParsed = JSON.parse(responseText);
    // Accommodate array or object wrapper
    const dataArray = Array.isArray(jsonParsed) ? jsonParsed : (jsonParsed.evaluations || []);
    return dataArray as GeminScreeningOutput[];
  } catch (err) {
    throw new Error("Failed to parse Gemini response: " + responseText);
  }
};
