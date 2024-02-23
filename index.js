import puppeteer from "puppeteer";

const getQuotes = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://news.ycombinator.com/", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const quotes = await page.evaluate(() => {
    const quoteList = document.querySelectorAll(".athing");

    // For each quote fetch the text and author
    const data = Array.from(quoteList).map((quote) => {
      const title = quote.querySelector(".titleline > a").innerText;
      const link = quote.querySelector(".titleline > a").href;

      return { title, link };
    });

    // const subtextList = document.querySelectorAll(".subline");
    // return Array.from(subtextList).map((quote) => {
    //   const time = quote.querySelector(".age").title;
    //   return { ...data, time };
    // });
    return data;
  });

  // Display the quotes
  console.log(quotes);

  // Close the browser
  await browser.close();
};

// Start the scraping
getQuotes();
