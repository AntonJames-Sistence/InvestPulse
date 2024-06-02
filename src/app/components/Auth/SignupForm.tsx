import React, { useState } from 'react';
import csrfFetch from '../../utils/csrfFetch';

interface SignupFormProps {
  toggleForm: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ toggleForm }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (password.length < 6 || !/[^A-Za-z0-9]/.test(password)) {
      alert('Password must be at least 6 characters long and contain at least one symbol');
      return;
    }

    try {
      const response = await csrfFetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });
      const data = await response.json();
      alert(data.message);
      if (data.sessionToken) {
        sessionStorage.setItem('sessionToken', data.sessionToken);
      }
    } catch (error) {
      alert('Error signing up');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-700 hover:bg-blue-400 text-white font-medium py-2 px-4 rounded-xl transition duration-200 ease-in-out"
      >
        Sign Up
      </button>
      <div className="mt-4 text-center">
        <p className="text-gray-600">Already have an account?</p>
        <button
          type="button"
          className="mt-2 bg-blue-700 hover:bg-blue-400 transition duration-200 ease-in-out text-white font-medium py-2 px-6 h-10 rounded-xl"
          onClick={toggleForm}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default SignupForm;