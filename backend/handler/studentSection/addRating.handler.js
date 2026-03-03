import db from "../../db.js";

const addRating = async (req, res) => {
  try {
    const facultyId = req.params.id;  // Faculty ID from the URL parameter
    const userId = req.user.id;  // Get the user ID from the logged-in user

    // Get the ratings from the request body
    const { teaching, marking, behaviour } = req.body;

    // Insert or update the review in the database
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
      [userId, facultyId, teaching, marking, behaviour] // Correct the order of parameters
    );

    // Send a success response
    return res.json({ message: "Rating added/updated successfully" });
  } catch (err) {
    console.error("addRating error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default addRating;