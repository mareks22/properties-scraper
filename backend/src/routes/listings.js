"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listingsRouter = void 0;
const express_1 = require("express");
const index_1 = require("../index");
exports.listingsRouter = (0, express_1.Router)();
exports.listingsRouter.get("/sell", (req, res) => {
    index_1.pool.query("SELECT * FROM insertions_sell;", (error, results) => {
        if (error) {
            console.error("Error executing query", error);
            res.status(500).json({ error: "Error executing query" });
        }
        else {
            res.json(results.rows);
        }
    });
});
exports.listingsRouter.get("/rent", (req, res) => {
    index_1.pool.query("SELECT * FROM insertions_rent;", (error, results) => {
        if (error) {
            console.error("Error executing query", error);
            res.status(500).json({ error: "Error executing query" });
        }
        else {
            res.json(results.rows);
        }
    });
});
