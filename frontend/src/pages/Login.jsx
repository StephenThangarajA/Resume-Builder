import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = () => {
        let hasError = false;
        const newErrors = { email: '', password: '' };
        if (!email) {
            newErrors.email = 'Email is required';
            hasError = true;
        } else if (!validateEmail(email)) {
            newErrors.email = 'Enter a valid email';
            hasError = true;
        }
        if (!password) {
            newErrors.password = 'Password is required';
            hasError = true;
        }
        setErrors(newErrors);
        if (!hasError) {
            console.log('Form submitted successfully');
        }
    };

    return (
        <div className="bg-blue-200 min-h-screen flex flex-col justify-center"> 
            <div className="max-w-screen-2xl flex justify-center align-middle">
                <div className="min-w-96 h-auto mt-10 p-8 rounded-lg shadow-xl border-r-16 bg-white border-blue-200 border-2">
                    <div className="flex justify-cente align-middle flex-col">
                        <h1 className="text-gray-900 text-3xl text-center mb-4 font-bold">Log In</h1>
                        <h3 className="text-gray-700 text-center mb-6">Please enter your details</h3>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`mb-2 p-3 rounded-lg w-full bg-transparent border ${
                                errors.email ? 'border-red-500' : 'border-blue-700'
                            } text-gray-900 focus:outline-none`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`mb-2 p-3 rounded-lg w-full bg-transparent border ${
                                errors.password ? 'border-red-500' : 'border-blue-700'
                            } text-gray-900 focus:outline-none`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}
                        <button 
                            onClick={handleSubmit}
                            className="mb-4 w-full py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-lg"
                        >
                            Log In
                        </button>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg"
                        >
                            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                            Sign in with Google
                        </button>
                        <div className="mt-4 text-center text-gray-700">
                            <p>Don't have an account?</p>
                            <Link to="/signup"  className="text-blue-700 font-bold">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
