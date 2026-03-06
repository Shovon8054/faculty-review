import db from "../../../db.js";

const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, graduated_institution, courses } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const [result] = await db.query(
      `UPDATE faculty 
       SET name=?, department=?, graduated_institution=?, courses=?
       WHERE id=?`,
      [name, department ?? null, graduated_institution ?? null, courses ?? null, id]
    );
    

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // return updated row
    const [rows] = await db.query("SELECT * FROM faculty WHERE id = ?", [id]);
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default updateFaculty;