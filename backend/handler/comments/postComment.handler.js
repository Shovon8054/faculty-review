import db from "../../db.js";

const postComment=async(req, res)=>{
    const userId=req.user.id;
    const {queryId, body}=req.body;
    try{
        const [result]=await db.query("INSERT INTO comments (query_id, user_id, body) VALUES(?,?,?)",[queryId, userId, body]);
        return res.json(result)
    } catch{
        return res.json({message:"Post comment error"})
    }
}

export default postComment;