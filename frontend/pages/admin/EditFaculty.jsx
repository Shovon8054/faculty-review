import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AdminNavbar from "../../components/AdminNavbar";

const EditFaculty = () => {

    const {id}=useParams();
    const navigate=useNavigate();

    const [form, setForm]=useState({
        name: "",
        department: "",
        graduated_institution: "",
        courses: "",
        })

    const [msg, setMsg]=useState("")

    useEffect(()=>{
        loadFaculty()
    }, [id])

    // load faculty
    const loadFaculty=async()=>{
        try{
            const res=await axios.get(`http://localhost:8080/api/admin/faculty/${id}`,{
                withCredentials: true,
            })

            setForm({
                name: res.data.name ?? "",
                department: res.data.department ?? "",
                graduated_institution: res.data.graduated_institution ?? "",
                courses: res.data.courses ?? "",
            })

        }catch (err) {
        console.log(err);
        setMsg("Failed to load faculty data");
      }
    }

    // handle update function

    const handleUpdate=async(e)=>{
        e.preventDefault();
        setMsg("");

        if (!form.name.trim()){
            setMsg("Faculty name required")
        }

        try {
            await axios.put(`http://localhost:8080/api/admin/faculty/${id}`, form, {
                withCredentials: true,
            });
            navigate("/admin-manage-faculty");
        } catch (err) {
            console.log(err);
            setMsg("Failed to update");
        }
    }

    // handle change function

    const handleChange=(e)=>{
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

  return (
    <div>
      <AdminNavbar />

      <div className="p-4 sm:p-6 max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Edit Faculty</h2>
          <button
            type="button"
            onClick={() => navigate("/admin-manage-faculty")}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Back
          </button>
        </div>

        {msg && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {msg}
          </div>
        )}

        <form onSubmit={handleUpdate} className="bg-white border rounded-2xl p-4 space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Name"
          />

          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Department"
          />

          <input
            name="graduated_institution"
            value={form.graduated_institution}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Graduated institution"
          />

          
          <textarea
            name="courses"
            value={form.courses}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 min-h-[100px]"
            placeholder="Courses (comma separated)"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-black text-white hover:opacity-90"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditFaculty
