import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiEdit3, FiInfo } from "react-icons/fi";
import Navbar from "@/components/Navbar";

const PromptSelect = () => {
  const navigate = useNavigate();

  const redirectWithState = (path, state) => {
    setTimeout(() => {
      navigate(path, { state });
    }, 500);
  };

  const handleSelectionResume = async (promptType) => {
    redirectWithState("/resume-upload", { promptType });
  };

  const handleSelectionText = async (promptType) => {
    redirectWithState("/text-input", { promptType });
  };
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="absolute inset-0 bg-blue-200" />
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl w-full space-y-8 p-4">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How would you like to input your skills?
          </h1>
          <div className="grid gap-8 md:grid-cols-2">
            <button
              onClick={() => handleSelectionResume("resume")}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
            >
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-700 rounded-full mb-4">
                  <FiUpload className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Upload Resume
                </h2>
                <p className="text-gray-600">
                  Make sure your resume is in PDF format
                </p>
              </div>
              <div className="px-8 py-4 flex items-center text-sm text-blue-700">
                <FiInfo className="w-5 h-5 mr-2" />
                Beta feature, supports resumes up to 2 pages long
              </div>
            </button>

            <button
              onClick={() => handleSelectionText("text")}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            >
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-700 rounded-full mb-4">
                  <FiEdit3 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Text Prompt
                </h2>
                <p className="text-gray-600">
                  Write about your skills and experience
                </p>
              </div>
              <div className="px-8 py-4 text-sm text-blue-700">
                Ideal for customized input
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptSelect;
