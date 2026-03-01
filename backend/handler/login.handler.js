import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const normalizedEmail = email.toLowerCase();

    if (
    !normalizedEmail.endsWith("@g.bracu.ac.bd") &&
    !normalizedEmail.endsWith("@bracu.ac.bd")
    ) {
    return res.status(400).json({ message: "Only BRACU emails allowed" });
    }

    const [rows] = await db.query(
      "SELECT id, role, password_hash FROM users WHERE email = ?",
      [normalizedEmail]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0]; // ✅ declare BEFORE using

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Login success",
      user: { id: user.id, role: user.role },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default loginHandler;