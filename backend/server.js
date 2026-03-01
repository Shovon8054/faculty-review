import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import cookieParser from "cookie-parser";

// =====================import handler=================
import registerHandler from "./handler/register.handler.js";
import loginHandler from "./handler/login.handler.js";
import addFacultyHandler from "./handler/faculty/addFaculty.handler.js";
import fetchFaculty from "./handler/faculty/fetchFaculty.handler.js";


// ========================middleware import==================
import protect from "./middleware/protect.middleware.js";
import adminOnly from "./middleware/admin.middleware.js";
import authorize from "./middleware/authorize.middleware.js";


// =========================================================
dotenv.config();

const app = express();
app.use(cors({
      origin: "http://localhost:5173",
      credentials: true,
    }));
app.use(cookieParser()); 

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

app.get("/api/profile", protect, (req, res) => {
  res.json({ message: "ok", user: req.user });
})

app.get("/api/admin/dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: "welcome admin" });
});


// clear cookie for log out
app.post("/api/logout", (req, res) => {
  res.clearCookie("token"); 
  res.json({ message: "Logged out" });
})

// =======================================API ENDPOINTS============================================
app.post("/api/register", registerHandler)
app.post("/api/login", loginHandler);

// faculty section
app.post("/api/admin/faculty", protect, authorize("admin"), addFacultyHandler);
app.get("/api/admin/faculty", protect, authorize("admin"), fetchFaculty);
// ================================================================================================


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});