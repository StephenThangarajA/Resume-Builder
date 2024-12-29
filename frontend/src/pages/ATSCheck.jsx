import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

export default function ATSCheck() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const refInp = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please select a valid PDF file");
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a resume file");
      return;
    }
    if (refInp.current.value === "") {
      setError("Enter the Job Description");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("des", refInp.current.value);

    try {
      const response = await fetch("http://localhost:5000/api/ats-check", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-blue-200 flex items-center justify-center min-h-screen w-full">
        <main className="flex-grow pt-5 sm:pt-5">
          <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-12 px-2 lg:px-4 space-y-8 lg:space-y-0 lg:space-x-6">
            <div className="lg:w-2/5">
              <Card className="bg-white backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    ATS Resume Check
                  </CardTitle>
                  <p className="mt-2 text-sm text-gray-600">
                    Upload your resume to check its ATS compatibility score
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-center items-center w-full">
                        <label
                          htmlFor="resume-upload"
                          className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer ${
                            file
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300 hover:border-gray-400 bg-white"
                          }`}
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload
                              className={`w-12 h-12 mb-3 ${
                                file ? "text-green-500" : "text-gray-400"
                              }`}
                            />
                            {file ? (
                              <p className="text-sm text-green-600">
                                {file.name}
                              </p>
                            ) : (
                              <>
                                <p className="mb-2 text-sm text-gray-500">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                  PDF files only
                                </p>
                              </>
                            )}
                          </div>
                          <input
                            id="resume-upload"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Job Description
                        </label>
                        <textarea
                          name="des"
                          rows="4"
                          ref={refInp}
                          placeholder="Enter the Job Description"
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400 transition-colors duration-300"
                        />
                      </div>
                      {error && <p className="text-sm text-red-600">{error}</p>}

                      <button
                        type="submit"
                        disabled={loading || !file}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                          loading || !file
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        }`}
                      >
                        {loading ? "Analyzing..." : "Check Resume"}
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {result && (
              <div className="lg:w-3/5 bg-white rounded-lg shadow-lg p-8 border border-gray-200 relative">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Analysis Results
                </h3>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <p className="text-gray-500 text-2xl">
                      ATS Compatibility Score
                    </p>
                    <p className="text-3xl font-bold text-blue-700">
                      {result.score}%
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-500 text-2xl">
                      Relevant Score
                    </p>
                    <p className="text-3xl font-bold text-blue-700">
                      {result.RelevantScore}%
                    </p>
                  </div>
                </div>
                <div className="space-y-6 mt-4">
                  {result.suggestions && (
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-4">
                        Suggestions for Improvement
                      </p>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                        {result.suggestions.map((suggestion, index) => {
                          const splitSuggestion = suggestion.split(":");
                          return (
                            <li key={index}>
                              <strong>{splitSuggestion[0]}:</strong> {splitSuggestion[1]}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}