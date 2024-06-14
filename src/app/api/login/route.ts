import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_key';

export const POST = async (req: NextRequest, res: NextResponse) => {
    // Deconstruct props from request
    const body = await req.json();
    const { email, password } = body;

    // Check email and password
    if (!email || !password){
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    };

    // Connect to DB
    if (!process.env.DATABASE_URL){
        return NextResponse.json({ message: `Couldn't reach DB, please check your key` }, { status: 500 });
    }
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        // Fetch user from DB
        const result = await sql`SELECT * FROM USERS WHERE EMAIL = ${email}`;
        const user = result[0];

        // Compare password
        if (!user || !(await bcrypt.compare(password, user.password))){
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        // Set JWT token, username and exparation time
        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        // Generate response and set cookies
        const response = NextResponse.json({ message: 'Login successful', token, username: user.username });
        response.cookies.set('token', token, { httpOnly: true, path: '/' });

        return response;
    } catch (error) {
        return NextResponse.json({ message: `Error logging in: ${error}` }, { status: 500 });
    }

};