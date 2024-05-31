import { NextApiRequest, NextApiResponse } from "next";
import postgres from "postgres";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const generateSessionToken = () => crypto.randomBytes(32).toString('hex');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST'){
        return res.status(405).json({ message: 'Method Not Allowed' });
    };

    // Checking email and password from request
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json({ message: 'All fields Are required' });
    };

    // Connecting to DB...
    if (!process.env.DATABASE_URL){
        return res.status(400).json({ message: `Couldn't reach DB, please check your key` });
    }
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        // Fetching user from DB...
        const result = await sql`SELECT * FROM USERS WHERE EMAIL = ${email}`;
        const user = result[0];

        // Comparing password...
        if (!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate and Update session token for user in DB
        const sessionToken = generateSessionToken();
        await sql`UPDATE users SET session_token = ${sessionToken} WHERE email = ${email}`;

        // Set JWT token and exparation time
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/`);
        res.status(200).json({ message: 'Login successful', sessionToken });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }

};