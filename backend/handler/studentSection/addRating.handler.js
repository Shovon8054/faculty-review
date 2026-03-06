import db from "../../db.js";

const addRating = async (req, res) => {
  try {
    const facultyId = req.params.id;  
    const userId = req.user.id;  

   
    const { teaching, marking, behaviour } = req.body;

    
    await db.query(
      `
      INSERT INTO reviews (user_id, faculty_id, teaching, marking, behaviour)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        teaching = VALUES(teaching),
        marking = VALUES(marking),
        behaviour = VALUES(behaviour),
        updated_at = CURRENT_TIMESTAMP
      `,
      [userId, facultyId, teaching, marking, behaviour] 
    );

    
    return res.json({ message: "Rating added/updated successfully" });
  } catch (err) {
    console.error("addRating error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default addRating;