import { NextApiRequest, NextApiResponse } from 'next';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const generateSessionToken = () => crypto.randomBytes(32).toString('hex');

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { username, email, password } = req.body;

    // Check for credentials
    if (!username || !email || !password) {
        return new Response('', {
            status: 400,
            statusText: `Did not receive all credentials`
          });
    };
    // Check connection to Database
    if (!process.env.DATABASE_URL) {
        return new Response(``, {
          status: 400,
          statusText: `Couldn't reach DB, please check your key`
        })
    };

    // Hashing password...
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generating session token...
    const sessionToken = generateSessionToken();
    // Connecting to DB...
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    // Creating user...
    try {
        await sql`
            INSERT INTO users (username, email, password, session_token)
            VALUES (${username}, ${email}, ${hashedPassword}, ${sessionToken})
        `;
        return new Response(``, {
            status: 200,
            statusText: 'Successfully created user'
        });
    } catch (error) {
      return new Response(``, {
        status: 400,
        statusText: `Couldn't create user, ${error}`
      });
    }
}

// users table schema
// -- Drop the existing users table
// DROP TABLE IF EXISTS users;

// -- Create the new users table with an additional session_token column
// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     session_token VARCHAR(64), -- New column for session token
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
