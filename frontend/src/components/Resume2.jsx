import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
const Resume2 = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        email: '',
        degree: '',
        college: '',
        year: '',
        profile: '',
        linkedin: '',
        github: '',
        summary: '',
        skills: [],
        experience: '',
        education: '',
        additionalInfo: ''
    });

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState("");

    const skills = ["JavaScript", "React", "Node.js", "Python", "Solidity"];

    const handleSkillAdd = () => {
        if (currentSkill && !selectedSkills.includes(currentSkill)) {
            setSelectedSkills([...selectedSkills, currentSkill]);
            setFormData(prevData => ({
                ...prevData,
                skills: [...prevData.skills, currentSkill]
            }));
        }
        setCurrentSkill(""); // Reset the dropdown
    };

    const [experiences, setExperiences] = useState([]);
    const [currentJob, setCurrentJob] = useState({
        jobTitle: "",
        description: "",
    });

    const handleAddExperience = () => {
        if (currentJob.jobTitle && currentJob.description) {
            setExperiences([...experiences, currentJob]);
            setFormData(prevData => ({
                ...prevData,
                experience: [...prevData.experience, currentJob]
            }));
            setCurrentJob({
                jobTitle: "",
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

    async function handleats() {
        const combinedString = `
        Name: ${formData.name}
        Phone: ${formData.phone}
        Address: ${formData.address}
        Email: ${formData.email}
        Degree: ${formData.degree}
        College: ${formData.college}
        Year: ${formData.year}
        Profile: ${formData.profile}
        LinkedIn: ${formData.linkedin}
        GitHub: ${formData.github}
        Summary: ${formData.summary}
        Education: ${formData.education}
        Additional Info: ${formData.additionalInfo}

        Skills: ${formData.skills.join(", ")}

        Experience:
        ${formData.experience}
    `;
        try {
            const response = await axios.post("http://localhost:5000/api/ats-check-2", { data: combinedString });
       
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar />
        <div className="flex flex-row">
            <div className="w-1/3 bg-gray-50 p-6 flex flex-col space-y-4">
                <h2 className="text-xl font-bold mb-4">Update Details</h2>

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
                    Profession:
                    <input
                        type="text"
                        name="profile"
                        value={formData.profile}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter your profession"
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
                    LinkedIn:
                    <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter your LinkedIn profile"
                    />
                </label>

                <label className="text-sm font-medium">
                    GitHub:
                    <input
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter your GitHub profile"
                    />
                </label>

                <label className="text-sm font-medium">
                    Summary:
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter a brief summary"
                    />
                </label>

                <label className="text-sm font-medium">
                    Technical Skills:
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
                    <button
                        onClick={handleSkillAdd}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded w-full hover:bg-blue-700"
                    >
                        Add Skill
                    </button>
                </label>

                <label className="text-sm font-medium">
                    Experience:
                    <textarea
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter professional experience"
                    />
                </label>

                <label className="text-sm font-medium">
                    Education:
                    <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter your education"
                    />
                </label>

                <label className="text-sm font-medium">
                    Additional Information:
                    <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Enter any additional information"
                    />
                </label>
                <button
                    onClick={handleats}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded w-full hover:bg-blue-700"
                >Check ATS and Relevant Score</button>
            </div>

                   <div className="w-2/3 bg-white p-8 max-w-3xl mx-auto rounded-lg shadow-md mt-10">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-blue-700">{formData.name || "Name"}</h1>
                    <h2 className="text-xl text-gray-600">{formData.profile || "Profession"}</h2>
                    <p className="text-sm text-gray-500 mt-2">
                        {formData.address || "Address"} | {formData.email || "Email"} | {formData.linkedin || "LinkedIn"} | {formData.github || "GitHub"}
                    </p>
                </div>

                <div className="mt-6">
                    <hr className="border-t-4 border-blue-700" />
                    <h3 className="text-xl font-semibold text-blue-700">About Me</h3>
                    <hr className="border-t-4 border-blue-700" />
                    <p className="text-gray-600 mt-2 overflow-wrap break-word whitespace-pre-wrap">{formData.summary || "Summary"}</p>
                </div>

                <div className="mt-6">
                    <hr className="border-t-4 border-blue-700" />
                    <h3 className="text-xl font-semibold text-blue-700">TECHNICAL SKILLS</h3>
                    <hr className="border-t-4 border-blue-700" />
                    <div className="grid grid-cols-3 gap-4 mt-4 text-gray-600">
                        {formData.skills.map((skill, index) => (
                            <p key={index}>{skill}</p>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <hr className="border-t-4 border-blue-700" />
                    <h3 className="text-xl font-semibold text-blue-700">PROFESSIONAL EXPERIENCE</h3>
                    <hr className="border-t-4 border-blue-700" />
                    <p className="text-gray-600 mt-2">{formData.experience || "Professional Experience"}</p>
                </div>

                <div className="mt-6">
                    <hr className="border-t-4 border-blue-700" />
                    <h3 className="text-xl font-semibold text-blue-700">EDUCATION</h3>
                    <hr className="border-t-4 border-blue-700" />
                    <p className="text-gray-600 mt-2">{formData.education || "Education"}</p>
                </div>

                <div className="mt-6">
                    <hr className="border-t-4 border-blue-700" />
                    <h3 className="text-xl font-semibold text-blue-700">ADDITIONAL INFORMATION</h3>
                    <hr className="border-t-4 border-blue-700" />
                    <p className="text-gray-600 mt-2">{formData.additionalInfo || "Additional Information"}</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Resume2;