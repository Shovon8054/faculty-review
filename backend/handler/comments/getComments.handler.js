import db from "../../db.js";

const getComment=async(req, res)=>{
    const {queryId}=req.params;
    try{
        const [result]=await db.query(`
            SELECT comments.id,
              comments.body,
              comments.created_at,
              comments.user_id,
              users.name
            FROM comments
            JOIN users ON comments.user_id = users.id
            WHERE comments.query_id = ?
            ORDER BY comments.created_at DESC
            
            `,[queryId])

        return res.json(result)
    } catch(err){
        console.error(err)
        return res.json("fetch comment not found")
    }
}

export default getComment;