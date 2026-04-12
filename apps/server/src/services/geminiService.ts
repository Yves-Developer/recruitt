import { GoogleGenerativeAI } from "@google/generative-ai";
import { Job, Applicant, ScreeningResult } from "@repo/shared";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const screenCandidates = async (
  job: Job,
  applicants: Applicant[]
): Promise<ScreeningResult[]> => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an expert HR recruitment assistant. 
    Analyze the following job description and the list of applicants.
    Rank the applicants based on their suitability for the role.
    
    Job Description:
    ${JSON.stringify(job)}
    
    Applicants:
    ${JSON.stringify(applicants)}
    
    Return a JSON array of objects with the following schema:
    [
      {
        "candidateId": "string",
        "rank": number,
        "matchScore": number (0-100),
        "strengths": ["string"],
        "gaps": ["string"],
        "recommendation": "string",
        "reasoning": "string"
      }
    ]
    
    Focus on:
    - Skill relevance
    - Total years of experience vs required
    - Educational background
    - Specific strengths and potential risks (gaps)
    
    Be objective and provide clear reasoning for each decision.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Basic JSON parsing from Markdown block if necessary
  const jsonMatch = text.match(/\[.*\]/s);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  throw new Error("Failed to parse Gemini response");
};
