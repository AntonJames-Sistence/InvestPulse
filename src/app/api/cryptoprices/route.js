import { NextResponse } from "next/server";

export async function GET(request) {
    const urlParams = new URL(request.url).searchParams;
    const coinName = urlParams.get('coin');

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=inr%2Cusd&include_24hr_change=true`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.error();
    }
}
