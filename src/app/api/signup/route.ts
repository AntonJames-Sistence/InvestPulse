import { NextRequest, NextResponse } from "next/server";
import postgres from 'postgres';
import bcrypt from 'bcryptjs';

export async function POST(req: Request | NextRequest, res: Response | NextResponse) {
    // Check connection to Database
    if (!process.env.DATABASE_URL) {
        return new Response(``, {
          status: 400,
          statusText: `Couldn't reach DB, please check your key`
        })
    };

    

    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });


}
