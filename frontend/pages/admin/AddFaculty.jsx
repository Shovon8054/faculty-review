import { useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";

export default function AddFaculty(){
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [graduatedInstitution, setGraduatedInstitution] = useState("");
  const [courses, setCourses] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
        const data = {
        name,
        department,
        graduated_institution: graduatedInstitution,
        courses
        };
      await axios.post(
        "http://localhost:8080/api/admin/faculty",
        data,
        { withCredentials: true }
        );

      setMsg("Faculty added successfully!");

    
      setName("");
      setDepartment("");
      setGraduatedInstitution("");
      setCourses("");
    } catch (err) {
      setMsg("Failed to add faculty");
      console.log(err);
    }
  }; <AdminNavbar />

  return (
    <div>
        <AdminNavbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-2xl shadow p-6"
        >
            <h2 className="text-2xl font-semibold text-center mb-6">
            Add Faculty (Admin)
            </h2>

            <div className="space-y-4">
            <input
                type="text"
                placeholder="Faculty initial *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                required
            />

            <input
                type="text"
                placeholder="Department (optional)"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />

            <input
                type="text"
                placeholder="Graduated institution (optional)"
                value={graduatedInstitution}
                onChange={(e) => setGraduatedInstitution(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />

            <textarea
                placeholder='Courses (optional) e.g. "CSE110, CSE220, CSE221"'
                value={courses}
                onChange={(e) => setCourses(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />

            {msg && (
                <p className="text-sm text-center text-green-600">{msg}</p>
            )}

            <button
                type="submit"
                className="w-full bg-black text-white rounded-lg py-2 font-medium hover:opacity-90"
            >
                Add Faculty
            </button>
            </div>
        </form>
        </div>
    </div>
  );
}