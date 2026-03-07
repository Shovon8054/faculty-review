import db from "../../db.js";

const getPostForEdit = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `SELECT * FROM queries WHERE id = ?`,
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "query not found" });
    }

    return res.json(result[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
};

const putPostForEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;

    if (!body?.trim()) {
      return res.status(400).json({ message: "Query body is required" });
    }

    const [result] = await db.query(
      `UPDATE queries SET body = ? WHERE id = ?`,
      [body, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "query not found" });
    }

    return res.json({ message: "Query updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export { getPostForEdit, putPostForEdit };