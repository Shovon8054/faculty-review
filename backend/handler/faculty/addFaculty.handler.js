import db from "../../db.js";

const addFacultyHandler=async(req, res)=>{
    try{

        const {name, department, graduated_institution, courses}=req.body ?? {};
        if (!name?.trim()){
            return res.status(400).json({ message: "name required" });
        }

        await db.query(
            "INSERT INTO faculty (name, department, dp_url, graduated_institution, courses) VALUES (?,?,?,?,?)",
            [
                name.trim(),
                department?.trim()||null,
                null,
                graduated_institution?.trim()||null,
                courses?.trim()||null,
            ]
        );
        return res.status(201).json({ message: "Faculty added" });

    } catch(err){
        console.error("ADD FACULTY ERROR:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

export default addFacultyHandler;