import db from "../../../db.js";

const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM faculty WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default getFacultyById;