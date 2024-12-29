import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../components/firebase';  

const SignUpComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = () => {
    if (loading) return;
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const userData = {
        message: 'Sign-up successful! Welcome!',
      };
      // Navigate to '/' and pass user data to the target route
      navigate('/', { state: userData });
    }, 2000);
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google Sign-In successful:', user);
      navigate('/', { state: { message: 'Successfully logged in with Google!' ,log:1} });
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setErrors({ google: 'Failed to sign in with Google. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-blue-200 min-h-screen flex flex-col justify-center">
        <div className="max-w-screen-2xl flex justify-center align-middle">
          <div className="min-w-96 h-auto mt-10 p-8 rounded-lg shadow-xl border-r-16 bg-white border-blue-200 border-2">
            <div className="flex justify-center align-middle flex-col">
              <h1 className="text-gray-900 text-3xl text-center mb-4 font-bold">Sign Up</h1>
              <h3 className="text-gray-700 text-center mb-6">Please enter your details</h3>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`mb-2 p-3 rounded-lg w-full bg-transparent border ${
                  errors.firstName ? 'border-red-500' : 'border-blue-700'
                } text-gray-900 focus:outline-none`}
              />
              {errors.firstName && <p className="text-red-500 text-sm mb-4">{errors.firstName}</p>}
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`mb-2 p-3 rounded-lg w-full bg-transparent border ${
                  errors.lastName ? 'border-red-500' : 'border-blue-700'
                } text-gray-900 focus:outline-none`}
              />
              {errors.lastName && <p className="text-red-500 text-sm mb-4">{errors.lastName}</p>}
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
                className="mb-4 w-full py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-lg"
                onClick={handleClick}
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
              <button
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                {loading ? 'Signing in...' : 'Sign up with Google'}
              </button>
              {errors.google && <p className="text-red-500 text-sm mt-4">{errors.google}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
