import puppeteer from "puppeteer";
import cheerio from "cheerio";
import he from "he";

export interface Property {
  img: string;
  title: string;
  price: string;
  location: string;
  url: string;
}

const entries = 100;

export async function scrapeWebsite(
  url: string,
  currentPage = 1,
  currentScrapedProperties: Property[] = []
): Promise<Property[]> {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const pageContent = await page.content();
  const $ = cheerio.load(pageContent);
  const properties = $("div.property");

  properties.each((index, element) => {
    const $property = $(element);
    const imgUrl = $property.find("img").eq(0).attr("src");
    const title = $property.find("span.name").eq(0).text();
    const url = $property.find("a.title").eq(0).attr("href");
    const locality = $property.find("span.locality").eq(0).text();
    const price = $property.find("span.price").eq(0).text();

    const baseUrl = "https://www.sreality.cz";
    const fullUrl = new URL(url ? url : "", baseUrl).href;

    const decodedPrice = he.decode(price).replace(/(\$|\n|\t)/g, "");

    currentScrapedProperties.push({
      img: imgUrl || "",
      title: title || "",
      price: decodedPrice || "",
      location: locality || "",
      url: fullUrl || "",
    });

    console.log(
      `Scraped properties: ${currentScrapedProperties.length - 1} / ${entries} `
    );
  });

  const nextPageLink = $("li.paging-item a").eq(currentPage).attr("href");

  if (nextPageLink && currentScrapedProperties.length < entries) {
    const nextPageUrl = new URL(nextPageLink, url).href;
    const nextPage = currentPage + 1;
    console.log("Current page:", currentPage);
    await scrapeWebsite(nextPageUrl, nextPage, currentScrapedProperties);
  } else {
    console.log("Scraping complete.");
  }

  await browser.close();
  return currentScrapedProperties;
}
