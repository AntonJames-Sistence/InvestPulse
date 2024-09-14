import { NextResponse } from 'next/server';

export async function GET() {
  const url = 'https://investpulse-news.onrender.com/scrape';

  try {
    // Fetch the response from scrape endpoint
    const response = await fetch(url);
    const data = await response.json();
    // Return the scraped news items as a JSON response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
