# 🧠 Recruitt AI Prompt Library

This document tracks the evolution, testing, and current production state of our AI Prompt Engineering for the Recruitt Talent Screening Platform.

## 🛠️ Model Context
- **Current Model:** `gemini-2.5-flash-lite`
- **Reasoning:** Selected for its extreme low latency (~1-2s response time) and improved JSON instruction following compared to standard Flash models.

---

## 📜 Prompt Evolution & "Why it Changed"

### v1.0: Baseline Extraction
**Raw Prompt Snippet:**
> *"Extract the information and map it EXACTLY into the following JSON schema. [Schema follows]"*

**The Problem:** 
- The AI was too passive. If work history wasn't in a "Text-Standard" format, it would simply skip the entire `experience` array, resulting in empty profiles for perfectly valid candidates.

---

### v2.0: Aggressive Duration Capture
**Raw Prompt Snippet Added:**
> *"Look for dates (e.g., 2021-2024, Jan 2022 to Present) and map them to YYYY-MM. Do not leave the experience array empty if work history is present in the text."*

**The Problem:** 
- While data capture increased, the AI became "hallucinatory." It started seeing names in the **References** section and assigning their Senior roles to the candidates themselves. This created false seniority in the talent pool.

---

### v3.0: The Identity Guard
**Raw Prompt Snippet Added:**
> *"IDENTITY: Only extract information belonging to the candidate. REFERENCES: ABSOLUTELY IGNORE 'References' or 'Mentors' sections. Do NOT assign their names or roles to the Candidate's work history."*

**The Problem:** 
- PDF text layers often come in "scrambled" (lines appearing out of order). The dates would appear 3 lines above the job title, causing the AI to lose the connection and return empty experience arrays again for messy PDFs.

---

### v4.0: The Layout-Aware Mapper (LATEST ✅)
**Raw Prompt Snippet Added:**
> *"SCRAMBLED LAYOUTS: Associate dates near headers even if they are on separate lines due to extraction noise. PROJECTS AS EXPERIENCE: Treat long-term 'Self-Initiated Projects' (1+ years) as professional roles to ensure tenure credit."*

**Why it Works:**
- **Inverted Logic:** It now looks both up and down for dates, making it resilient to dirty PDF text layers.
- **Tenure Credit:** By treating self-initiated work as experience, it accurately validates junior developers who have 3+ years of coding history but haven't worked at 100-person firms yet.
- **Skill Precision:** We added: *"If a skill mentions '0y', map with yearsOfExperience: 0 and level: 'Beginner'."* to prevent the AI from guessing experience.

---

## 🏗️ Technical Implementation Strategy
**Source:** `apps/server/src/services/resumeParser.ts`

### 1. In-Context Constraints
We don't just ask for JSON; we provide **Enums** in the prompt (e.g., `Beginner|Intermediate|Advanced|Expert`) to ensure the AI's output can be directly indexed by our database without transformation errors.

### 2. Failure Handling
We use the `responseMimeType: "application/json"` on the Gemini API. This forces the model to return a parsable structure, reducing the chance of code crashes due to "trailing markdown" in the AI response.

---

## 📊 Evaluation Matrix
| Version | Extraction Success | Ref Identity Guard | Scrambled Layout Support |
|---------|-------------------|--------------------|--------------------------|
| v1.0    | 50%               | ❌                  | ❌                        |
| v2.0    | 85%               | ❌                  | ❌                        |
| v3.0    | 90%               | ✅                  | ❌                        |
| v4.0    | 98%               | ✅                  | ✅                        |
