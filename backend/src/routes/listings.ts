import { Router, Response } from "express";
import { pool } from "../index";
import cors from "cors";

export const listingsRouter = Router();
listingsRouter.use(cors())
listingsRouter.get("/sale", (req, res: Response) => {
  pool.query(
    "SELECT * FROM insertions_sell;",
    (error: Error, results: { rows: any }) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).json({ error: "Error executing query" });
      } else {
        res.json(results.rows);
      }
    }
  );
});

listingsRouter.get("/rent", (req, res: Response) => {
  pool.query(
    "SELECT * FROM insertions_rent;",
    (error: Error, results: { rows: any }) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).json({ error: "Error executing query" });
      } else {
        res.json(results.rows);
      }
    }
  );
});
