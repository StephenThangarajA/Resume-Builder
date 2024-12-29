import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const userData = location.state;
  let isLoggedIn=0;
  if(userData){
    isLoggedIn=1;
    localStorage.setItem("log",1);
  }

  return (
    <>
      <Navbar />
      <div>
        
        <div className="flex flex-col md:flex-row justify-center items-center h-screen w-screen pl-16">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative h-full flex flex-col items-center md:items-start justify-center md:w-1/2"
          >
            <div className="text-3xl mt-12 md:text-5xl leading-relaxed font-bold text-gray-800 text-center md:text-left mb:2 md:mb-4">
              Build your Resume with <br />  
              <div className="typing-demo font-mono text-4xl font-bold border-r-4 text-blue-700 border-black overflow-hidden whitespace-nowrap mt-4">
                Instacks!!
              </div>
              <style>
                {`@keyframes typing {0% {width: 0;}100% {width: 12ch;}}@keyframes blink {50% {border-color: transparent;}}.typing-demo {width: 12ch;animation: typing 1.5s steps(22) infinite, blink 0.5s step-end infinite alternate;}`}
              </style>
            </div><br />
            <div className="font-extralight text-base md:text-4xl text-gray-700 py-4 mb:2 md:mb-4">
            Design your career path with a professional resume and ATS insights.
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={isLoggedIn?"/choosetemplate":"/login"}>
                <button className="bg-blue-700 rounded-full w-fit text-white px-4 py-2 mb-2">
                  Create Resume
                </button>
              </Link>
              <Link to={isLoggedIn?"/ats-check":"/login"}>
                <button className="bg-blue-700 rounded-full w-fit text-white px-4 py-2 mb-2">
                  Check ATS Score
                </button>
              </Link>
            </div>
            <div className="mt-16">
              <p className="mb-4 font-bold text-2xl">Be at the role as you aspire to be</p>
              <div className="flex flex-row gap-2">
                <button className="bg-zinc-300 rounded-full w-fit text-gray-700 px-4 py-2 mb-2">
                  Software Developer
                </button>
                <button className="bg-zinc-300 rounded-full w-fit text-gray-700 px-4 py-2 mb-2">
                  Education
                </button>
                <button className="bg-zinc-300 rounded-full w-fit text-gray-700 px-4 py-2 mb-2">
                  Finance
                </button>
              </div>
              <div className="flex flex-row gap-2">
                <button className="bg-zinc-300 rounded-full w-fit text-gray-700 px-4 py-2 mb-2">
                  Healthcare
                </button>
                <button className="bg-zinc-300 rounded-full w-fit text-gray-700 px-4 py-2 mb-2">
                  Marketing
                </button>
                <button className="bg-zinc-300 rounded-full w-fit text-gray-700 px-4 py-2 mb-2">
                  Graphics Designer
                </button>
              </div>
              <p className="mt-4 text-black">The ultimate platform to refine your resume, optimize it for ATS scanners, and prepare effectively for your career goals. Enhance your skills and practice for technical and coding interviews with confidence.</p>
            </div>

          </motion.div>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="w-full md:w-1/2 flex justify-end items-center md:mt-0 pb-6 md:pb-0"
          >
            <div className="p-2 rounded-md animate-small-bounce relative">
              <img
                src={"/app.png"}
                alt="resume"
                className="h-[400px] md:h-[500px] rounded object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default App;
