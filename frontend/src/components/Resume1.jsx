import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
const Resume1 = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        email: '',
        degree: '',
        college: '',
        year: '',
        profile:''
    });
    

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState("");

    const skills = ["JavaScript", "React", "Node.js", "Python", "Solidity"];

    const handleSkillAdd = () => {
        if (currentSkill && !selectedSkills.includes(currentSkill)) {
            setSelectedSkills([...selectedSkills, currentSkill]);
        }
        setCurrentSkill(""); // Reset the dropdown
    };

    const [image,setImage]=useState(null);

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [currentLanguage, setCurrentLanguage] = useState("");

    const languages = ["English", "Spanish", "French", "German", "Chinese"];

    const handleLanguageAdd = () => {
        if (currentLanguage && !selectedLanguages.includes(currentLanguage)) {
            setSelectedLanguages([...selectedLanguages, currentLanguage]);
        }
        setCurrentLanguage(""); // Reset the dropdown
    };
    const [experiences, setExperiences] = useState([]);
    const [currentJob, setCurrentJob] = useState({
        jobTitle: "",
        description: "",
    });

    const handleAddExperience = () => {
        if (currentJob.jobTitle && currentJob.description) {
            setExperiences([...experiences, currentJob]);
            setCurrentJob({
                jobTitle: "",
                description: "",
            });
        }
    };
    const [references, setReferences] = useState([]);
    const [currentReference, setCurrentReference] = useState({
        name: "",
        description: "",
    });

    const handleAddReference = () => {
        if (currentReference.name && currentReference.description) {
            setReferences([...references, currentReference]);
            setCurrentReference({
                name: "",
                description: "",
            });
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange=(e)=>{
        console.log(e.target.files);
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
        setImage(imageURL);
    }
}


const [resATS,setATS]=useState(null);
    async function handleats() {
        const combinedString = `
        Name: ${formData.name} Phone: ${formData.phone} Address: ${formData.address} Email: ${formData.email} Degree: ${formData.degree} College: ${formData.college} Year: ${formData.year} Profile: ${formData.profile} Skills: ${selectedSkills.join(", ")} Languages: ${selectedLanguages.join(", ")} Experiences:${experiences.map((exp, index) => `  ${index + 1}. ${exp.jobTitle} - ${exp.description}`).join("\n")} References:${references.map((ref, index) => `  ${index + 1}. ${ref.name} - ${ref.description}`).join("\n")}`;
        try {
            const response = await axios.post("http://localhost:5000/api/ats-check-1", { data: combinedString });
            //response.data.score is ATS score
            //response.data.RelevantScore is Relevant Score'
            setATS(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar />
        <div className="flex flex-row ">
            {/* Left Side: Input Fields */}
            <div className="w-1/3 bg-gray-50 p-6 flex flex-col space-y-4">
                <h2 className="text-xl font-bold mb-4">Update Details</h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ marginTop: "20px", display: "block", margin: "0 auto" }}
                />

                <label className="text-sm font-medium">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter your name"
                    />
                </label>

                <label className="text-sm font-medium">
                    Phone Number:
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter your phone number"
                    />
                </label>

                <label className="text-sm font-medium">
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter your address"
                    />
                </label>

                <label className="text-sm font-medium">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter your email"
                    />
                </label>
                <label className="text-sm font-medium">
                    Year:
                    <input
                        type="date"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </label>

                <label className="text-sm font-medium">
                    College Name:
                    <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter your college name"
                    />
                </label>

                <label className="text-sm font-medium">
                    Degree:
                    <input
                        type="text"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter your degree"
                    />
                </label>
                <label className="text-sm font-medium">
                    Profile:
                    <input
                        type="text"
                        name="profile"
                        value={formData.profile}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter your degree"
                    />
                </label>

                <label className="text-sm font-medium">
                Select Your Skills:
                <select
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                    <option value="">Select a skill</option>
                    {skills.map((skill) => (
                        <option key={skill} value={skill}>
                            {skill}
                        </option>
                    ))}
                </select>
                </label>  
                <button
                onClick={handleSkillAdd}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add Skill
            </button>  
            <label className="text-sm font-medium">
                Select Your Languages:
                <select
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                    <option value="">Select a language</option>
                    {languages.map((language) => (
                        <option key={language} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
            </label>
            <button
                onClick={handleLanguageAdd}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add Language
            </button>
            <label className="text-sm font-medium">
                    Job Title:
                    <input
                        type="text"
                        value={currentJob.jobTitle}
                        onChange={(e) =>
                            setCurrentJob({ ...currentJob, jobTitle: e.target.value })
                        }
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter job title"
                    />
                </label>

                <label className="text-sm font-medium">
                    Description:
                    <textarea
                        value={currentJob.description}
                        onChange={(e) =>
                            setCurrentJob({ ...currentJob, description: e.target.value })
                        }
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter job description"
                    />
                </label>

                <button
                    onClick={handleAddExperience}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Experience
                </button>

                <label className="text-sm font-medium">
                    Reference Name:
                    <input
                        type="text"
                        value={currentReference.name}
                        onChange={(e) =>
                            setCurrentReference({ ...currentReference, name: e.target.value })
                        }
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter reference name"
                    />
                </label>

                <label className="text-sm font-medium">
                    Reference Description:
                    <textarea
                        value={currentReference.description}
                        onChange={(e) =>
                            setCurrentReference({ ...currentReference, description: e.target.value })
                        }
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter reference description"
                    />
                </label>

                <button
                    onClick={handleAddReference}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Reference
                </button>
                <button
                    onClick={handleats}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >Check ATS and Relevant Score</button>
                                {
                    resATS &&
                <div className='w-80 h-96'>
                    <p className='text-black'>Resume Score:<span className='text-blue-700 text-xl'>{resATS.score}</span></p>
                    <p className='text-black'>Relevant Score:<span  className='text-blue-700 text-xl'>{resATS.RelevantScore}</span></p>

                </div>
}
            </div>
            
            

            {/* Right Side: Resume Section */}
            <div className="w-2/3 bg-gray-100 flex flex-row justify-center items-center ">
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="grid grid-cols-3">
                        {/* Left Section */}
                        <div className="bg-blue-900 text-white p-6 col-span-1">
                            <div className="text-center">
                            <img
                                src={image}
                                alt="Profile"
                                className="w-24 h-24 mx-auto rounded-full border-4 border-white"
                            />
                                <h1 className="text-xl font-bold mt-4">{formData.name || "Your Name"}</h1>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold border-b border-gray-300 pb-2">Contact</h3>
                                <ul className="mt-4 space-y-2">
                                    <li className='text-xs'>📞 {formData.phone || "+123-456-7890"}</li>
                                    <li className='text-xs'>📧 {formData.email || "hello@reallygreatsite.com"}</li>
                                    <li className='text-xs'>📍 {formData.address || "123 Anywhere St., Any City"}</li>
                                    <li className='text-xs'>🌐 www.reallygreatsite.com</li>
                                </ul>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold border-b border-gray-300 pb-2">Education</h3>
                                <ul className="mt-4 space-y-2">
                                    <li className='text-xs'>{formData.year || "year"} </li>
                                    <li className='text-xs'>{formData.college || "college"} </li>
                                    <li className='text-xs'>{formData.degree || "degree"} </li>
                                </ul>
                            </div> 
                           
                            
                                <div className="mt-6">
                                <div className="mt-4">
                <h3 className="text-lg font-semibold">Selected Skills:</h3>
                <ul>
                    {selectedSkills.map((skill, index) => (
                        <li key={index} className='text-xs'>{skill}</li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="mt-4">
                <h3 className="text-lg font-semibold">Selected Languages:</h3>
                <ul>
                    {selectedLanguages.map((language, index) => (
                        <li key={index} className='text-xs'>{language}</li>
                    ))}
                </ul>
            </div>
                                
                        

                          
                            
                        </div>
                        <div className="col-span-2 p-6">

                                     {/* Right Section */}
          <div className="col-span-2 p-6">
            <div>
              <h3 className="text-2xl font-bold border-b border-gray-300 pb-2">Profile</h3>
              <p className="mt-4 text-gray-700">
                {formData.profile || "your profile data"}
              </p>
            </div>
            <div className="mt-6">
    <h3 className="text-2xl font-bold border-b border-gray-300 pb-2">
        Work Experience
    </h3>
    <ul className="space-y-4">
        {experiences.map((experience, index) => (
            <li key={index} className="break-words">
                <h4 className="font-semibold text-lg">{experience.jobTitle}</h4>
                <p className="mt-2 text-gray-700 text-xs">{experience.description}</p>
            </li>
        ))}
    </ul>
</div>
            <div className="mt-6">
            <h3 className="text-2xl font-bold border-b border-gray-300 pb-2">Reference</h3>
              <div className="mt-4 space-y-4">
              <ul>
                    {references.map((reference, index) => (
                        <li key={index} className="break-words mt-4">
                            <h4 className="font-semibold text-lg">{reference.name}</h4>
                            <p className="mt-2 text-gray-700 text-xs">{reference.description}</p>
                        </li>
                    ))}
                </ul>
              </div>
            </div>
            </div>

                                    
                                    
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            </div>
     
    );
};

export default Resume1;
