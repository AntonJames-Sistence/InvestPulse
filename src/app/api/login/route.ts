import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_key';

const generateSessionToken = () => crypto.randomBytes(32).toString('hex');

export const POST = async (req: NextRequest, res: NextResponse) => {
    // Checking email and password from request
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password){
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    };

    // Connecting to DB...
    if (!process.env.DATABASE_URL){
        return NextResponse.json({ message: `Couldn't reach DB, please check your key` }, { status: 500 });
    }
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        // Fetching user from DB...
        const result = await sql`SELECT * FROM USERS WHERE EMAIL = ${email}`;
        const user = result[0];

        // Comparing password...
        if (!user || !(await bcrypt.compare(password, user.password))){
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        // Generate and Update session token for user in DB
        const sessionToken = generateSessionToken();
        await sql`UPDATE users SET session_token = ${sessionToken} WHERE email = ${email}`;

        // Set JWT token and exparation time
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        const response = NextResponse.json({ message: 'Login successful', sessionToken });
        response.cookies.set('token', token, { httpOnly: true, path: '/' });

        return response;
    } catch (error) {
        return NextResponse.json({ message: `Error logging in: ${error}` }, { status: 500 });
    }

};