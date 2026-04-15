import { GoogleGenerativeAI } from "@google/generative-ai";
import { JobDocument } from "../models/Job.js";
import { ApplicantDocument } from "../models/Applicant.js";

let genAI: GoogleGenerativeAI | null = null;

/**
 * Initializes and returns a Gemini generative model instance.
 * @returns {GenerativeModel} The configured Gemini flash model.
 */
const getModel = () => {
  if (!genAI) {
    const key = (process.env.GEMINI_API_KEY || "").trim();
    console.log(`Gemini Key Initializing... (Length: ${key.length})`);
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not set. Requests will fail.");
    }
    genAI = new GoogleGenerativeAI(key || "dummy_key_if_missing");
  }
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
};

/**
 * Output structure for a single applicant evaluation.
 */
export interface GeminScreeningOutput {
  applicantId: string;
  rank: number;
  matchScore: number;
  strengths: string[];
  gapsRisks: string[];
  finalRecommendation: string;
}

/**
 * Scoring priorities for the AI screening matrix.
 */
export interface ScreeningWeights {
  skills: number;
  experience: number;
  education: number;
  projects?: number;
}

/**
 * Uses Gemini AI to analyze, score, and rank candidates against job requirements.
 * @param {JobDocument} job - The job description and requirements.
 * @param {ApplicantDocument[]} applicants - List of candidates to evaluate.
 * @param {ScreeningWeights} [weights] - Optional priority weights for scoring logic.
 * @returns {Promise<GeminScreeningOutput[]>} Array of AI-generated evaluations.
 */
export const screenCandidates = async (
  job: JobDocument,
  applicants: ApplicantDocument[],
  weights?: ScreeningWeights
): Promise<GeminScreeningOutput[]> => {
  const model = getModel();

  // Map to just the data we need so we don't blow up the context window
  const mappedApplicants = applicants.map(a => ({
    id: a._id?.toString() || a.id,
    headline: a.headline || "No headline",
    skills: (a.skills || []).map(s => `${s.name || 'Unknown'} (${s.level || 'Unknown'}) - ${s.yearsOfExperience || 0}y`),
    experience: (a.experience || []).map(e => `${e.role || 'Role'} at ${e.company || 'Company'} (${e.startDate || '?'} to ${e.endDate || 'present'}) - ${e.description || 'No description'}`),
    education: a.education?.map(e => `${e.degree || 'Degree'} in ${e.fieldOfStudy || 'Field'} at ${e.institution || 'Institution'}`) || [],
    certifications: a.certifications?.map(c => c.name).filter(Boolean) || [],
    projects: a.projects?.map(p => `${p.name || 'Project'} - ${p.description || 'No description'}`) || []
  }));

  const weightInstruct = weights 
    ? `IMPORTANT: When scoring, apply the following weights to your evaluation criteria:
       - Technical Skills: ${weights.skills}%
       - Work Experience: ${weights.experience}%
       - Academic Education: ${weights.education}%
       - Relevant Projects: ${weights.projects || 10}%`
    : "Use a balanced evaluation considering skills, experience, and education equally.";

  const prompt = `
    You are an expert HR recruitment assistant. 
    Analyze the following job description and the list of applicants.
    Rank the applicants based on their suitability for the role.
    
    ${weightInstruct}

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
