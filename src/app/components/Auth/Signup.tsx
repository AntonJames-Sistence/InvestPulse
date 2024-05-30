import React, { useState } from 'react';

const Signup: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle not atching passwords, improve later
        if (password !== confirmPassword) {
            alert('Password do not match');
            return;
        }
        // Handle weak password, improve later
        if (password.length < 6 || !/[^A-Za-z0-9]/.test(password)) {
            alert('Password must be at least 6 characters long and contain at least one symbol');
            return;
        }

        try {
            const response = await fetch('api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            // handling error, improve later
            alert('Error during signing up')
        };
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default Signup;
