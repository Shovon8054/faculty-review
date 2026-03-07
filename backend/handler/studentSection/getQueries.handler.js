import db from "../../db.js";

const getQueries=async(req, res)=>{
    try{
        const [result]=await db.query(
            `SELECT q.id, q.body, q.parent_id, q.created_at, u.name, u.email 
            FROM queries q JOIN users u ON 
            q.user_id=u.id ORDER BY q.created_at DESC`
        );
        return res.status(200).json(result)
    } catch(error){
        return res.status(500).json("get query error")
    }
}

export default getQueries;