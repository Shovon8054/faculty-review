import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import cookieParser from "cookie-parser";

// =====================import handler=================
import registerHandler from "./handler/register.handler.js";
import loginHandler from "./handler/login.handler.js";


// ==============================================================
// ADMIN SECTION
// ==============================================================
import addFacultyHandler from "./handler/faculty/addFaculty.handler.js";
import fetchFaculty from "./handler/faculty/fetchFaculty.handler.js";
import deleteFaculty from "./handler/faculty/deleteFaculty.handler.js";
import getFacultyById from "./handler/faculty/updateFaculty/getFacultyById.handler.js";
import updateFaculty from "./handler/faculty/updateFaculty/updateFaculty.handler.js";
import getAllUsers from "./handler/handleUsers/getAllUsers.js";
import blockUser from "./handler/handleUsers/blockUser.js";
// ==============================================================================================



// ==============================================================
// STUDENT SECTION
// ===============================================================

import facultyWithReviews from "./handler/studentSection/facultyWithReviews.handler.js";
import addRating from "./handler/studentSection/addRating.handler.js";
import getProfile from "./handler/studentSection/profile.js";
// query
import queryHandler from "./handler/studentSection/queries.handler.js";
import getQueries from "./handler/studentSection/getQueries.handler.js";
import deleteQuery from "./handler/deleteQuery.handler.js";
import { getPostForEdit, putPostForEdit } from "./handler/studentSection/editQueries.handler.js";

// comment
import postComment from "./handler/comments/postComment.handler.js";
import getComment from "./handler/comments/getComments.handler.js";
import deleteComment from "./handler/comments/deleteComment.handler.js";
// ==============================================================================================





// =========================================================
// middleware import
// =========================================================
import protect from "./middleware/protect.middleware.js";
import adminOnly from "./middleware/admin.middleware.js";
import authorize from "./middleware/authorize.middleware.js";


// =========================================================
dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB check on server start
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("DB connected!");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
})();

app.get("/api/profile", protect, (req, res) => {
  res.json({ message: "ok", user: req.user });
})

app.get("/api/me", protect, (req, res) => {
  res.json(req.user);
});

app.get("/api/admin/dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: "welcome admin" });
});


// clear cookie for log out
app.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json({ message: "Logged out" });
})

// =======================================API ENDPOINTS============================================
app.post("/api/register", registerHandler)
app.post("/api/login", loginHandler);




// /////////////////////////////////admin section/////////////////////////////////////////
app.post("/api/admin/faculty", protect, authorize("admin"), addFacultyHandler);
app.get("/api/admin/faculty", protect, authorize("admin"), fetchFaculty);
app.delete("/api/admin/faculty/:id", protect, authorize("admin"), deleteFaculty);
app.get("/api/admin/faculty/:id", protect, authorize("admin"), getFacultyById);
app.put("/api/admin/faculty/:id", protect, authorize("admin"), updateFaculty);
// get users
app.get("/api/admin/users", protect, authorize("admin"), getAllUsers);
app.patch("/api/admin/users/:id", protect, authorize("admin"), blockUser);





// ////////////////////////////////student section///////////////////////////
app.get("/api/student/faculty-with-review", protect, authorize("student"), facultyWithReviews)
app.post("/api/student/add-rating/:id", protect, authorize("student"), addRating)
app.get("/api/student/profile", protect, authorize("student"), getProfile)   //get profile api endpoint
// ---------------------queries-----------------
app.post("/api/student/queries", protect, authorize("student"), queryHandler)

app.get("/api/student/queries", protect, getQueries)
app.delete("/api/queries/:id", protect, deleteQuery)
// update
app.get("/api/student/queries/:id", protect, authorize("student"), getPostForEdit)
app.put("/api/student/queries/:id", protect, authorize("student"), putPostForEdit)

// comment
app.post("/api/comment", protect, authorize("student"), postComment);
app.get("/api/comment/:queryId", protect, authorize("student"), getComment);
app.delete("/api/comment/:id", protect, authorize("student"), deleteComment);
// ================================================================================================





app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});