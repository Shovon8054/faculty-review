import db from "../db.js";

const deleteQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;

    let result;

    if (role === "admin") {
      [result] = await db.query(
        `DELETE FROM queries WHERE id = ?`,
        [queryId]
      );
    } else {
      [result] = await db.query(
        `DELETE FROM queries WHERE id = ? AND user_id = ?`,
        [queryId, userId]
      );
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Query not found" });
    }

    return res.status(200).json({ message: "Query deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Delete query error" });
  }
};

export default deleteQuery;