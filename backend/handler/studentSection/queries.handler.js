import db from "../../db.js";

const queryHandler=async(req, res)=>{
    try{

        const {body} = req.body;

        if(!body || !body.trim()){
            return res.status(400).json({message: "body required"})
        }

        const [result]=await db.query(`INSERT INTO queries (user_id, parent_id, body) VALUES(?,?,?)`,
            [req.user.id, null, body.trim()]
        )

        return res.status(201).json(result)

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

export default queryHandler;