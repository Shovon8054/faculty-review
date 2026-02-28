import bcrypt from "bcrypt";
import db from "../db.js";

const registerHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email, password required" });
    }

    const normalizedEmail = email.toLowerCase(); 

    if (!normalizedEmail.endsWith("@g.bracu.ac.bd")) {
      return res.status(400).json({ message: "invalid email" });
    }

    const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [
      normalizedEmail,
    ]);

    if (rows.length > 0) {
      return res.status(409).json({ message: "user already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    
    await db.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?,?,?)",
      [name, normalizedEmail, hashedPass]
    );

    return res.json({ message: "registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
};

export default registerHandler;