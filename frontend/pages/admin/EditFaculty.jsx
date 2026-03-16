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
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />

        <div className="max-w-md mx-auto mt-10 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Edit Faculty</h2>
            <button
              type="button"
              onClick={() => navigate("/admin-manage-faculty")}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 shadow-sm"
            >
              Back
            </button>
          </div>

          {/* Message */}
          {msg && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {msg}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleUpdate}
            className="bg-white rounded-2xl p-6 shadow-md space-y-4"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Name"
            />

            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Department"
            />

            <input
              name="graduated_institution"
              value={form.graduated_institution}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Graduated Institution"
            />

            <textarea
              name="courses"
              value={form.courses}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[100px] focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Courses (comma separated)"
            />

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Update
            </button>
          </form>
        </div>
      </div>
  )
}

export default EditFaculty
