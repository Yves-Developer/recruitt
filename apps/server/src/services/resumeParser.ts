import { GoogleGenerativeAI } from "@google/generative-ai";
import { Applicant } from "@repo/shared";

let genAI: GoogleGenerativeAI | null = null;

const getModel = () => {
  if (!genAI) {
    const key = (process.env.GEMINI_API_KEY || "").trim();
    genAI = new GoogleGenerativeAI(key || "dummy_key");
  }
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
};

/**
 * Parses raw text from a resume/CV and maps it to the Talent Profile Schema.
 * @param {string} rawText - Unstructured text extracted from a document.
 * @returns {Promise<Partial<Applicant>>} Structured applicant data.
 */
export const parseResumeTextToSchema = async (rawText: string): Promise<Partial<Applicant>> => {
  const model = getModel();

  const prompt = `
    You are an expert recruitment AI. I will provide you with raw text extracted from a candidate's resume/CV.
    Your task is to extract the information and map it EXACTLY into the following JSON schema.
    
    IMPORTANT extraction rules:
    - SCRAMBLED LAYOUTS: Text from PDFs often comes in out of order. If you see a Date (e.g., 2021-2024) near a Section Header (e.g., Experience, Education), associate them even if they are on separate lines.
    - PROJECTS AS EXPERIENCE: If 'Self-Initiated Projects' or 'Personal Projects' have a long duration (1+ years) and professional descriptions, you MAY also list them in the 'experience' array to ensure the candidate gets credit for their tenure.
    - IDENTITY & REFERENCES: Be extremely careful with 'References' sections. Do NOT assign the names of references (e.g., NAYITURIKI Patrick) as the Candidate's own experience. However, do NOT ignore the candidate's own experience just because it is near a reference section.
    - SKILLS: If a skill explicitly mentions '0y' or 'Zero experience', map it with yearsOfExperience: 0 and level: 'Beginner'.
    - DATES: Standardize dates to YYYY-MM. 
    
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
      "availability": {"status": "Available|Open to Opportunities|Not Available", "type": "Full-time|Part-time|Contract"},
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

export const parseBulkDataToSchema = async (rawTableData: string): Promise<Partial<Applicant>[]> => {
  const model = getModel();

  const prompt = `
    You are an expert HR data engineer. I will provide you with raw text in CSV/Table format representing multiple job applicants.
    Your task is to parse this data and map each row to the following JSON schema array.
    
    Notes:
    - If a field is missing in the source, leave it null or omit it.
    - Standardize skills and proficiency levels to the allowed enums:
      - Skills Level: Beginner | Intermediate | Advanced | Expert
      - Language Proficiency: Basic | Conversational | Fluent | Native
      - Availability Status: Available | Open to Opportunities | Not Available
      - Availability Type: Full-time | Part-time | Contract
    
    Target Schema per item:
    {
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "headline": "string",
      "bio": "string",
      "location": "string",
      "skills": [{"name": "string", "level": "Enum", "yearsOfExperience": number}],
      "languages": [{"name": "string", "proficiency": "Enum"}],
      "experience": [{"company": "string", "role": "string", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "isCurrent": boolean, "description": "string"}],
      "education": [{"institution": "string", "degree": "string", "fieldOfStudy": "string", "startYear": number}],
      "availability": {"status": "Enum", "type": "Enum"}
    }

    Return a strictly valid JSON array of these objects.

    Raw Data:
    ---
    ${rawTableData}
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
    const parsed = JSON.parse(responseText);
    return Array.isArray(parsed) ? parsed : (parsed.applicants || []);
  } catch (err) {
    console.error("Gemini Bulk Parse Error. Response:", responseText);
    throw new Error("Failed to parse bulk data JSON from AI");
  }
};
