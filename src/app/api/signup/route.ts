import { NextApiRequest, NextApiResponse } from 'next';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
    // Connecting to DB...
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    // Creating user...
    try {
        await sql`
            INSERT INTO users (username, email, password)
            VALUES (${username}, ${email}, ${hashedPassword})
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
