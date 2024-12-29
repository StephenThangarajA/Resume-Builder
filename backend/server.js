const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const GEMINI_API_KEY = "AIzaSyDH7g441zf1MGWAMwMDmkn1bl0pNiPR4rk";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 0,
  maxOutputTokens: null,
  responseMimeType: "text/plain",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null,`${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

app.post("/api/ats-check-1",async (req, res) => {
  const textcont = req.body;
  try {
    const atsAnalysis = await analyzeResume1(textcont);
    res.json(atsAnalysis);
  } catch (error) {
    
    res.status(500).json({ error: "Failed to analyze resume using Gemini API." });
  }
});

async function analyzeResume1(resumeText) {
  const prompt = `
    Role: Resume Analyser,
    Inputs: [Resmue Content,Job Description],
    Task: Analyze the resume content well,
          Provide a score x (out of 100) for the resume based on relevancy,appropriateness of the resume content,
          Provide a score y (out of 100) for the relevant of the resume based on the given job description,
    Resume Content: ${resumeText},
    Output: {'score':x,'RelevantScore':y}
    NOTE : Output JSON only no other extra content
    take time,think well and give correct output.
  `;

  const result = await model.generateContent(prompt, generationConfig);
  const responseText = result.response.text();
  const clean_json = responseText.replace('```json\n', '').replace('\n```', '');
  console.log(clean_json)
  return JSON.parse(clean_json);
}

app.post("/api/ats-check-2",async (req, res) => {
  const textcont = req.body;
  try {
    const atsAnalysis = await analyzeResume2(textcont);
    res.json(atsAnalysis);
  } catch (error) {
    
    res.status(500).json({ error: "Failed to analyze resume using Gemini API." });
  }
});

async function analyzeResume2(resumeText) {
  const prompt = `
    Role: Resume Analyser,
    Inputs: [Resmue Content,Job Description],
    Task: Analyze the resume content well,
          Provide a score x (out of 100) for the resume based on relevancy,appropriateness of the resume content,
          Provide a score y (out of 100) for the relevant of the resume based on the given job description,
    Resume Content: ${resumeText},
    Output: {'score':x,'RelevantScore':y}
    NOTE : Output JSON only no other extra content
    take time,think well and give correct output.
  `;

  const result = await model.generateContent(prompt, generationConfig);
  const responseText = result.response.text();
  const clean_json = responseText.replace('```json\n', '').replace('\n```', '');
  console.log(clean_json)
  return JSON.parse(clean_json);
}

app.post("/api/ats-check", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;
  const jobdes = req.body.des;

  try {
    const atsAnalysis = await analyzeResume(filePath, jobdes);

    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting uploaded file:", err);
    });

    res.json(atsAnalysis);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "Failed to analyze resume using Gemini API." });
  }
});

async function analyzeResume(filePath, jd) {
  const resumeBuffer = fs.readFileSync(filePath);
  const resumeText = await pdfParse(resumeBuffer).then((data) => data.text);
  console.log(jd)
  const prompt = `
    Role: Resume Analyser,
    Inputs: [Resmue Content,Job Description],
    Task: Analyze the resume content well,
          Provide a score x (out of 100) for the resume based on relevancy,appropriateness of the resume content to the job description and its field,
          Provide a score y (out of 100) for the relevant of the resume based on the given job description,
          Provide suggestions for improvement (if any),evaluate factors such as keyword optimization, formatting, readability, proper use of sections (e.g., Summary, Skills, Experience, Education), and alignment with job-specific requirements,
    Resume Content: ${resumeText},
    Job description: ${jd},
    Output: {'score':x,'RelevantScore':y,suggestions':['suggestion1','suggestion2',..]}
    NOTE : Output JSON only no other extra content
    take time,think well and give correct output.
  `;

  const result = await model.generateContent(prompt, generationConfig);
  const responseText = result.response.text();
  const clean_json = responseText.replace('```json\n', '').replace('\n```', '');
  console.log(clean_json)
  return JSON.parse(clean_json);
}

app.post("/api/generate-cover-letter/text",async  (req, res) => {
  const { jobDescription, skillsExperience } = req.body;

  if (!jobDescription || !skillsExperience) {
    return res.status(400).json({
      success: false,
      error: "Job description and skills/experience are required.",
    });
  }

  const coverLetter =  await generateCoverLetter(jobDescription, skillsExperience);
  res.json({letter:coverLetter});
});


async function generateCoverLetter(jobDescription, skillsExperience) {
  const prompt = `
    Generate a professional cover letter based on the following job description and skills/experience:

    Job Description: 
    ${jobDescription}

    Skills/Experience:
    ${skillsExperience}

    The cover letter should be personalized, concise, and tailored to the job description, highlighting the relevant skills and achievements.
  `;

  try {
    const result = await model.generateContent(prompt, generationConfig);
    const responseText = result.response.text();
    return responseText;
  } catch (error) {
    console.error('Error generating cover letter:', error);
  }
}

async function generateCoverLetterfromResume(filePath,jd) {
  const resumeBuffer = fs.readFileSync(filePath);
  const resumeText = await pdfParse(resumeBuffer).then((data) => data.text);
  const prompt = `
    . Do not provide any other details.
    Generate a professional cover letter based on the following job description and the resume text given
    Resume:
    ${resumeText}
    Job description: ${jd}
  `;

  try {
    const result = await model.generateContent(prompt, generationConfig);
    const responseText = result.response.text();
    return responseText;
  } catch (error) {
    console.error('Error generating cover letter:', error);
  }
}
app.post("/api/generate-cover-letter", upload.single("resume"), async (req, res) => {
  const jobDescription = req.body.jobDescription;

  if (!req.file || !jobDescription) {
    return res.status(400).json({ error: "Resume file and job description are required." });
  }

  const filePath = req.file.path;

  try {
    const coverLetter = await generateCoverLetterfromResume(filePath,jobDescription);

    fs.unlink(filePath, (err) => {
    if (err) console.error("Error deleting uploaded file:", err);
    });
    res.json({letter:coverLetter});
  } catch (error) {
    console.error("Error generating cover letter:", error);
    res.status(500).json({ error: "Failed to process resume or generate cover letter." });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});