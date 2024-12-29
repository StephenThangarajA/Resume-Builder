# 🌟 Resume Builder Website with ATS Scanner 📏

Welcome to the **Resume Builder Website**! This project is designed to help users craft professional resumes, generate tailored cover letters, and evaluate ATS (Applicant Tracking System) and relevance scores with ease. 

## 🔧 Features

- 📊 **ATS Score Evaluation**: Discover how ATS-friendly your resume is.
- 📊 **Relevance Score Analysis**: Measure how relevant your resume is for specific job descriptions.
- 💡 **AI-Powered Suggestions**: Get smart recommendations for resume improvement.
- 🖋️ **Cover Letter Generator**: Quickly create personalized cover letters.
- 🗳 **New Templates**: Choose from 3 stunning and modern resume templates.
- 🛍️ **Intuitive UI**: Simple and sleek interface for creating and managing resumes.

## 📚 Technology Stack

- **Frontend**:  React.js,  Tailwind CSS
- **Backend**:  Node.js
- **Database & Hosting**:  Firebase
- **AI Model**:  Fine-tuned Gemini 1.5 Flash (optimized with temperature set to 2)

## 🌐 Unique Selling Proposition (USP)

- 📝 Generate job-specific cover letters with ease.
- 🔧 Effortlessly create resumes using sleek templates.
- 🎯 Analyze ATS and relevance scores to maximize job application success.

## 📚 Setup and Installation

Follow these steps to set up the project locally:

## Frontend
1. 🔧 Clone the repository:
   ```bash
   git clone https://github.com/StephenThangarajA/Resume-Builder.git
   cd frontend
   ```

2. 📁 Install dependencies:
   ```bash
   npm install
   ```

3. 🏢 Set up Firebase:
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable authentication, Firestore, and hosting.
   - Download the `firebaseConfig` file and place it in the project directory.

4. 🔍 Configure the `.env` file:
   - Add your Firebase configuration and other required environment variables.

5. 🔄 Start the development server:
   ```bash
   npm run dev
   ```

## Backend
1. 📁 Install dependencies:
   ```bash
   npm install
   ```

2. 🏢 Set up Firebase:
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable authentication, Firestore, and hosting.
   - Download the `firebaseConfig` file and place it in the project directory.

4. 🔍 Configure the `.env` file:
   - Add your Firebase configuration and other required environment variables.

5. 🔄 Start the development server:
   ```bash
   node server.js
   ```

## 🔢 Usage

1. 📝 Sign up or log in using the authentication system.
2. 🗎 Create or upload your resume.
3. 🎨 View ATS and relevance scores.
4. 🤓 Get AI-powered suggestions to enhance your resume.
5. 🌟 Generate a tailored cover letter.
6. 📦 Download or share your resume.

## 🔌 Folder Structure

```
Resume-Builder/
├── backend/                 # Backend server files
│   ├── uploads/             # File upload directory
│   ├── .gitignore           # Git ignore file
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express server entry
├── frontend/                # Frontend application
│   ├── public/              # Public assets
│   ├── src/                 # Source files
│   │   ├── assets/          # Static assets
│   │   ├── components/      # React components
│   │   │   ├── resume-ui/   # UI elements for the resume
│   │   │   ├── EducationForm.jsx
│   │   │   ├── ExperienceForm.jsx
│   │   │   ├── ExtraForm.jsx
│   │   │   ├── PersonalDetailsForm.jsx
│   │   │   ├── SkillForm.jsx
│   │   │   └── ... (other components)
│   │   ├── contexts/        # Context API for global state
│   │   │   └── ResumeContext.jsx
│   │   ├── pages/           # Main pages
│   │   │   ├── ATSCheck.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── ChooseTemplate.jsx
│   │   │   └── ... (other pages)
│   │   └── index.css        # Main CSS file
│   ├── .gitignore           # Git ignore file
│   ├── firebase.json        # Firebase configuration
│   ├── package.json         # Frontend dependencies
│   └── tailwind.config.js
```

## 🔒 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 📞 Contact

For inquiries or support, please reach out:
- 👨‍💼 **Name**: Stephen
- 📧 **Email**: stephenthangaraj14@gmail.com
- 🌐 **GitHub**: [StephenThangarajA](https://github.com/StephenThangarajA)

---

🙌 We hope this project helps you create exceptional resumes and land your dream job!
