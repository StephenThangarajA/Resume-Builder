import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BACKEND_URL = "http://localhost:5000";

export default function TextInputPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [skillsExperience, setSkillsExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobDescription.trim() || !skillsExperience.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/generate-cover-letter/text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          skillsExperience,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.letter);
    } catch (err) {
      setError(err.message || "Failed to generate cover letter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-200">
      <div className="fixed top-0 left-0 w-full bg-white shadow z-10" style={{ height: "4rem" }}>
        <Navbar />
      </div>
      <main className="flex-grow flex justify-center items-center" style={{ paddingTop: "4rem" }}>
        <div className="container mx-auto px-4 py-12 flex space-x-8 items-stretch">
          <div className="flex flex-col lg:flex-row gap-8 w-full items-stretch">
            {/* Form Section */}
            <div className="flex-1">
              <Card className="bg-white backdrop-blur-sm shadow-md rounded-lg h-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Generate Cover Letter
                  </CardTitle>
                  <p className="mt-2 text-sm text-gray-600">
                    Enter the job description and your skills/experience to generate a tailored cover letter
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job Description
                        </label>
                        <Textarea
                          placeholder="Enter the job description here"
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          rows={6}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Skills & Experience
                        </label>
                        <Textarea
                          placeholder="Enter your skills and experience here"
                          value={skillsExperience}
                          onChange={(e) => setSkillsExperience(e.target.value)}
                          rows={6}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      <Button
                        type="submit"
                        disabled={loading || !jobDescription.trim() || !skillsExperience.trim()}
                        className={`w-full ${loading ? "bg-blue-400 text-white cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 text-white"}`}
                      >
                        {loading ? "Generating..." : "Generate Cover Letter"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Result Section */}
            <div className="flex-1">
              <Card className="bg-white backdrop-blur-sm shadow-md rounded-lg h-full">
                <CardContent className="space-y-6 h-full flex flex-col justify-between">
                  {result ? (
                    <>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Generated Cover Letter
                      </h3>
                      <div className="whitespace-pre-wrap p-6 bg-gray-50 rounded-lg h-96 overflow-y-auto">
                        {result}
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Button
                          onClick={() => navigator.clipboard.writeText(result)}
                          className="flex-1 bg-blue-700 hover:bg-blue-800 text-white"
                        >
                          Copy to Clipboard
                        </Button>
                        <Button
                          onClick={() => {
                            const blob = new Blob([result], {
                              type: "text/plain",
                            });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = "cover-letter.txt";
                            a.click();
                            window.URL.revokeObjectURL(url);
                          }}
                          className="flex-1 bg-blue-700 hover:bg-blue-800 text-white"
                        >
                          Download as Text
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      Your result will appear here.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}