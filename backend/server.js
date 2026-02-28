import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";

// =====================import handler=================
import registerHandler from "./handler/register.handler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ DB check on server start
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ DB connected!");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
})();

// API ENDPOINTS
app.post("/api/register", registerHandler)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});