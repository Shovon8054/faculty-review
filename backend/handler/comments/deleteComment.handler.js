import db from "../../db.js";

const deleteComment=async(req, res)=>{
    const {id}=req.params;
    const userId=req.user.id;
    try{

        const [rows]=await db.query(`
            SELECT *FROM comments WHERE id=? AND user_id=?
            `, [id, userId])

        if (rows.length===0){
            return res.json("Not found")
        }

        await db.query(`
            DELETE FROM comments WHERE id=?
            `, [id])

        return res.json("comment deleted")

        
    } catch(err){
        console.error(err)
        return res.json("delete comment error")
    }
}

export default deleteComment;