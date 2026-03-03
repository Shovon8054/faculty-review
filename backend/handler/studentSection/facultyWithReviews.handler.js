import db from "../../db.js";
const facultyWithReviews=async(req, res)=>{
    try{
        const sqlQuery = `
        SELECT
            f.id, f.name, f.courses,
            COUNT(r.id) AS total_reviews,
            COALESCE(SUM(r.teaching), 0) AS sum_teaching,
            COALESCE(SUM(r.marking), 0) AS sum_marking,
            COALESCE(SUM(r.behaviour), 0) AS sum_behaviour  -- FIXED: changed sum_behavior to sum_behaviour
            
        FROM faculty f
        LEFT JOIN reviews r
            ON r.faculty_id = f.id AND r.is_deleted = 0

        GROUP BY f.id, f.name, f.courses
        ORDER BY f.name ASC
        `;

        const [result] = await db.query(sqlQuery);
        return res.json(result);
            

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export default facultyWithReviews;