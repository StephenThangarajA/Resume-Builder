import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChooseTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const templates = [
    { id: 1, name: "Modern", src: "/res1.jpg", route: "/resume1" },
    { id: 2, name: "Creative", src: "/res2.jpg", route: "/resume2" },
    { id: 3, name: "Professional", src: "/res3.png", route: "/create" },
  ];

  const handleSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleStartEditing = () => {
    if (selectedTemplate) {
      const selectedRoute = templates.find((t) => t.id === selectedTemplate)?.route;
      if (selectedRoute) {
        navigate(selectedRoute); // Navigates to the selected route
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <Navbar />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Select a Resume Template</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`flex flex-col border rounded-lg p-4 bg-white shadow-lg h-full ${
              selectedTemplate === template.id ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <img
              src={template.src}
              alt={template.name}
              className="rounded-md mb-4 w-full h-[350px] object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-700 text-center">
              {template.name}
            </h2>
            <button
              onClick={() => handleSelect(template.id)}
              className={`mt-auto w-full py-2 px-4 rounded-lg font-bold ${
                selectedTemplate === template.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {selectedTemplate === template.id ? "Selected" : "Select"}
            </button>
          </div>
        ))}
      </div>
      {selectedTemplate && (
        <div className="mt-8 p-4 bg-blue-100 rounded-md">
          <p className="text-lg text-blue-800">
            You have selected:{" "}
            <strong>{templates.find((t) => t.id === selectedTemplate)?.name}</strong>
          </p>
        </div>
      )}
      <button
        onClick={handleStartEditing}
        className={`mt-8 py-3 px-6 rounded-lg text-lg font-bold ${
          selectedTemplate
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        disabled={!selectedTemplate}
      >
        Start Editing
      </button>
    </div>
  );
};

export default ChooseTemplate;