import db from "../../db.js";

const blockUser=async(req, res)=>{
    const userId=req.params.id;
    try{
        const [result]=await db.query(`
            UPDATE users SET is_blocked=NOT is_blocked WHERE id=?
            `, [userId])
        if (result.affectedRows===0){
            return res.status(404).json({message: "user not found"})
        }

        const [updateUser]=await db.query(`
            SELECT id, name, email, role, is_blocked FROM users WHERE id = ?
            `, [userId])

        res.json(updateUser[0])

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default blockUser;