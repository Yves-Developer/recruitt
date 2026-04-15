import { GoogleGenerativeAI } from "@google/generative-ai";
import { Applicant } from "@repo/shared";

let genAI: GoogleGenerativeAI | null = null;

const getModel = () => {
  if (!genAI) {
    const key = (process.env.GEMINI_API_KEY || "").trim();
    genAI = new GoogleGenerativeAI(key || "dummy_key");
  }
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
};

export const parseResumeTextToSchema = async (rawText: string): Promise<Partial<Applicant>> => {
  const model = getModel();

  const prompt = `
    You are an expert recruitment AI. I will provide you with raw text extracted from a candidate's resume/CV.
    Your task is to extract the information and map it EXACTLY into the following JSON schema.
    If some information is missing, infer it if obvious or leave it empty where optional, but do your best to fill structural arrays (skills, experience, education, projects).
    Always return strictly valid JSON complying to this shape:
    {
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "headline": "string",
      "bio": "string",
      "location": "string",
      "skills": [{"name": "string", "level": "Beginner|Intermediate|Advanced|Expert", "yearsOfExperience": number}],
      "languages": [{"name": "string", "proficiency": "Basic|Conversational|Fluent|Native"}],
      "experience": [{"company": "string", "role": "string", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "description": "string", "technologies": ["string"], "isCurrent": boolean}],
      "education": [{"institution": "string", "degree": "string", "fieldOfStudy": "string", "startYear": number, "endYear": number}],
      "certifications": [{"name": "string", "issuer": "string", "issueDate": "string"}],
      "projects": [{"name": "string", "description": "string", "technologies": ["string"], "role": "string", "link": "string", "startDate": "YYYY-MM", "endDate": "YYYY-MM"}],
      "availability": {"status": "Open to Opportunities", "type": "Full-time"},
      "socialLinks": {"linkedin": "url", "github": "url", "portfolio": "url"}
    }

    Raw Resume Text:
    ---
    ${rawText}
    ---
  `;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const responseText = result.response.text();
  try {
    return JSON.parse(responseText);
  } catch (err) {
    throw new Error("Failed to parse extracted CV JSON");
  }
};
