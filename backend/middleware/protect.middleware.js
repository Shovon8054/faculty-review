import jwt from "jsonwebtoken";
import db from "../db.js"; 

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not logged in" });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [decoded.id]);
    const user = userRows[0];

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    
    if (user.is_blocked) {
      return res.status(403).json({ message: "Access denied: You are blocked" });
    }

    
    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;