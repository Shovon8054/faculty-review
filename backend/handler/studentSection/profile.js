import db from "../../db.js";

const getProfile = async (req, res) => {
    const id = req.user.id; 

    try {
        const [result] = await db.query(`SELECT id, name, email, role, created_at FROM users WHERE id = ?`, [id]);
        
        if (result.length === 0) {
            return res.json("Profile not found");
        }

        return res.json(result[0]);

    } catch (err) {
        console.error(err);
        return res.json("Get profile failed");
    }
}

export default getProfile;