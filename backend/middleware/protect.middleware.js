import jwt from "jsonwebtoken";
import db from "../db.js"; // your database connection

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not logged in" });
    }

    // verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fetch user from DB
    const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [decoded.id]);
    const user = userRows[0];

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ deny blocked users
    if (user.is_blocked) {
      return res.status(403).json({ message: "Access denied: You are blocked" });
    }

    // attach full user to req
    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;