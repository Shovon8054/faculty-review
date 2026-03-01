import db from "../../db.js";

const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM faculty WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    return res.json({ message: "Faculty deleted", id: Number(id) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default deleteFaculty;