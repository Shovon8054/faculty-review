

import db from "../../db.js";

const getQueries = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const [result] = await db.query(
      `SELECT 
        q.id,
        q.body,
        q.parent_id,
        q.created_at,
        q.user_id,
        u.name,
        u.email
       FROM queries q
       JOIN users u ON q.user_id = u.id
       ORDER BY q.created_at DESC`
    );

    const queriesWithOwnerFlag = result.map((query) => ({
      ...query,
      isOwner: query.user_id === loggedInUserId,
    }));

    return res.status(200).json(queriesWithOwnerFlag);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "get query error" });
  }
};

export default getQueries;