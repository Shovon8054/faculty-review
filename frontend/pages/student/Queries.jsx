import { useState } from "react";
import axios from "axios";
import StudentNavbar from "../../components/StudentNavbar";

const Queries = () => {

    const [body, setBody]=useState("")
    const [msg, setMsg]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:8080/api/student/queries",
                {body},
                {withCredentials:true}
            );
            setBody("")
            setMsg("Post added successfully")
        } catch (err) {
            setMsg("Failed to create query");
        }
    }

  return (
    <div>
        <StudentNavbar/>
        <div className="border p-4 rounded">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <textarea
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                placeholder="Post something..."
                className="border p-2 rounded"
                ></textarea>

                <button
                type="submit"
                className="self-start px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                Post
                </button>
            </form>
        </div>
    </div>
  )
}

export default Queries
