import { NextResponse } from 'next/server';

/* eslint-disable @typescript-eslint/no-require-imports */
let puppeteer;
let browser;

if (process.env.NODE_ENV === 'production') {
  puppeteer = require('puppeteer-core');
  browser = require('chrome-aws-lambda');
} else {
  puppeteer = require('puppeteer');
}

export async function GET() {
  const url = 'https://finance.yahoo.com/topic/latest-news/';

  try {
    const browserInstance =
      process.env.NODE_ENV === 'production'
        ? await puppeteer.launch({
            args: browser.args,
            executablePath: await browser.executablePath,
            headless: browser.headless,
          })
        : await puppeteer.launch({ headless: 'new' });

    const page = await browserInstance.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });

    // Wait for the content to load
    await page.waitForSelector('li.js-stream-content');

    // Scroll 2000px
    await page.evaluate(() => {
      window.scrollBy(0, 2000);
    });

    // Wait for a moment to allow new content to load after scrolling
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 2000))
    );

    // Fetch current time, day, and year
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    // Extract data from the page
    const newsItems = await page.evaluate(() => {
      const articles = Array.from(
        document.querySelectorAll('li.js-stream-content')
      );

      return articles
        .map((article) => {
          const titleElement = article.querySelector('h3 a');
          const linkElement = article.querySelector('h3 a');
          const summaryElement = article.querySelector('p');
          const imageElement = article.querySelector('img');
          const sourceElement = article.querySelector('span');

          // Skip if any of the required fields are missing
          if (
            !titleElement ||
            !summaryElement ||
            !imageElement ||
            !sourceElement
          ) {
            return null;
          }

          // Get image URL from 'srcset' or 'data-src' if 'src' is a placeholder
          let imageUrl = imageElement?.getAttribute('src');
          if (imageUrl.includes('spaceball.gif')) {
            imageUrl =
              imageElement?.getAttribute('data-src') ||
              imageElement?.getAttribute('srcset');
          }

          // If no valid image URL, skip the article
          if (!imageUrl) {
            return null;
          }

          return {
            title: titleElement?.textContent.trim(),
            link: linkElement?.getAttribute('href'),
            description: summaryElement?.textContent.trim(),
            imageUrl,
            source: sourceElement?.textContent.trim(),
          };
        })
        .filter((item) => item !== null); // Filter out null (skipped) articles
    });

    // Attach the fetched time details to each article
    const enrichedNewsItems = newsItems.map((item) => ({
      ...item,
      fetchedAt: formattedDate, // Adding the formatted date for each article
    }));

    await browserInstance.close();
    // console.log(enrichedNewsItems)

    // Return the fetched and enriched news items as JSON
    return NextResponse.json(enrichedNewsItems);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
