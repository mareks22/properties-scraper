import { Property, scrapeWebsite } from "./scraping";
import { pool } from "./index";

const sellUrl = "https://www.sreality.cz/en/search/for-sale/apartments/praha";
const rentUrl = "https://www.sreality.cz/en/search/to-rent/apartments/praha";

export async function getPropertiesForSellAndForRent() {
  try {
    await getPropertiesForSell();
    await getPropertiesForRent();
    console.log("Both operations completed successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getPropertiesForSell() {
  try {
    const data = await scrapeWebsite(sellUrl);
    for (const element of data) {
      await insertDataIntoDB(element, "sell");
    }
    console.log("Sell data inserted successfully.");
  } catch (error) {
    console.error("Error inserting sell data:", error);
  }
}

async function getPropertiesForRent() {
  try {
    const data = await scrapeWebsite(rentUrl);
    for (const element of data) {
      await insertDataIntoDB(element, "rent");
    }
    console.log("Rent data inserted successfully.");
  } catch (error) {
    console.error("Error inserting rent data:", error);
  }
}

const insertDataIntoDB = async (data: Property, type: "rent" | "sell") => {
  const query = `INSERT INTO insertions_${type} (title, location, price, img, url) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [data.title, data.location, data.price, data.img, data.url];

  try {
    const results = await pool.query(query, values);
    return results;
  } catch (error) {
    throw error;
  }
};

// export function getPropertiesForSell() {
//     scrapeWebsite(sellUrl)
//       .then((data) => {
//         data.forEach((element) => {
//           return insertDataIntoDB(element, "sell");
//         });
//       })
//       .then(() => {
//         console.log("Data inserted successfully.");
//       })
//       .catch((error: Error) => {
//         console.error("Error inserting data:", error);
//       });
//   }
//   export function getPropertiesForRent() {
//     scrapeWebsite(rentUrl)
//       .then((data) => {
//         data.forEach((element) => {
//           return insertDataIntoDB(element, "rent");
//         });
//       })
//       .then(() => {
//         console.log("Data inserted successfully.");
//       })
//       .catch((error: Error) => {
//         console.error("Error inserting data:", error);
//       });
//   }
  
//   const insertDataIntoDB = async (data: Property, type: "rent" | "sell") => {
//     const query = `INSERT INTO insertions_${type} (title, location, price, img, url) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
//     const values = [data.title, data.location, data.price, data.img, data.url];
  
//     pool.query(query, values, (error: Error, results) => {
//       if (error) {
//         throw error;
//       }
//       return results;
//     });
//   };
