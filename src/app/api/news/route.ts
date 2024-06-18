import { NextRequest, NextResponse } from "next/server";

const newsKey = process.env.NEWSDATA_KEY;

export const GET = async (req: NextRequest, res: NextResponse) => {
    if (!newsKey) {
        return NextResponse.json({ message: 'Error while getting news, please ensure key is up to date' }, { status: 400 });
    }

    const url = `https://newsdata.io/api/1/crypto?apikey=${newsKey}`;

    try {
        const data = await fetch(url);
        console.log(data.json())
    }
}