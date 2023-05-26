import express, { Express, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { Pool } from "pg";
import { listingsRouter } from "./routes/listings";
import { getPropertiesForSellAndForRent } from "./helper";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "scrap_db",
  password: "admin",
  port: 5432,
});

dotenv.config();

const app: Express = express();
const port = 8000;

app.use('/listings', listingsRouter);
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res: Response) => {
  res.json("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  getPropertiesForSellAndForRent();
});

