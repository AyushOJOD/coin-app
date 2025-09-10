import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getBlocks, fetchBlocks, getTransfers } from "./controllers/blocksController.js";

dotenv.config();
console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);
console.log(
  "Loaded BITQUERY_API_KEY:",
  process.env.BITQUERY_API_KEY ? "Set" : "Not set"
);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/blocks", getBlocks);
app.post("/api/fetch-blocks", fetchBlocks);
app.get("/api/transfers", getTransfers);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
