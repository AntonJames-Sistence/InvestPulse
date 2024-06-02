import React, { useState } from 'react';
import csrfFetch from '../../utils/csrfFetch';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await csrfFetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      alert(data.message);
      if (data.token) {
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('sessionToken', data.sessionToken);
      }
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <h2 className='text-2xl'>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="hidden my-4 lg:block bg-blue-700 hover:bg-blue-400 duration-200 easy-in-out text-white font-[500] px-6 h-8 self-center rounded-xl" type="submit"><p>Login</p></button>
    </form>
  );
};

export default Login;
