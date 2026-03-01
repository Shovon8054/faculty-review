import db from "../../db.js";

const fetchFaculty = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM faculty ORDER BY id DESC"
    );
    return res.json(rows);
  } catch (err) {
    console.error("GET FACULTY ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default fetchFaculty;