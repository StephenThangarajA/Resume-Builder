import { useNavigate } from "react-router-dom";
import { FiFileText, FiArrowRight } from "react-icons/fi";
import Navbar from "@/components/Navbar";

const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg-blue-200">
        <div className="min-h-screen flex items-center justify-center ">
          <div className="max-w-4xl w-full space-y-8 text-center">
            <div className="space-y-4">
              <FiFileText className="mx-auto h-24 w-24 text-blue-700 opacity-75" />
              <h1 className="text-xl font-bold text-blue-700 tracking-tight sm:text-5xl">
                Cover Letter Generator
              </h1>
              <p className="mt-6 text-xl sm:text-2xl text-gray-900 max-w-2xl mx-auto">
                Instantly generate quality cover letters for job applications!
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => navigate("/your-skills")}
                className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-700 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Get started
                <FiArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                { title: "Quick", description: "Generate in minutes" },
                {
                  title: "Professional",
                  description: "Tailored for your industry",
                },
                { title: "Effective", description: "Stand out to employers" },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white bg-opacity-25 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-900">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
