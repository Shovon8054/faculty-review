import db from "../../db.js";

const getAllUsers=async(req, res)=>{
    try{
        const [result]= await db.query(`
            SELECT id, name, email, role, is_blocked, created_at FROM users
            `)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export default getAllUsers;