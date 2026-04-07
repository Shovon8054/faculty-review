import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Footer from "../../components/Footer";
import AdminNavbar from "../../components/AdminNavbar"

const ManageFaculty = () => {
    const navigate = useNavigate();

    const [faculty, setFaculty] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchFaculty();
    }, []);
    // fetch faculty function=============================================
    const fetchFaculty = async () => {
    try {
        const res = await axios.get(
        "http://localhost:8080/api/admin/faculty",
        { withCredentials: true }
        );
        setFaculty(res.data);
    } catch (err) {
        console.log(err);
        setMsg("Failed to load faculty list");
    }
    };

    // delete faculty function===============================================
    const deleteFaculty = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/faculty/${id}`, {
                withCredentials: true,
            }); 
            setFaculty((prev) => prev.filter((f) => f.id !== id));
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete faculty");
        }
        };

  return (
    <div>
        <AdminNavbar/>
        <div>
            <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold">Faculty List</h2>
            </div>

            {msg && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {msg}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {faculty.map((f) => (
                <div
                    key={f.id}
                    className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-4 sm:p-5"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base sm:text-lg font-semibold leading-snug">
                        {f.name}
                    </h3>

                    {/* Optional badge */}
                    <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        ID: {f.id}
                    </span>
                    </div>

                    {/* Info */}
                    <div className="mt-3 space-y-2 text-sm">
                    <p className="text-gray-700">
                        <span className="font-medium text-gray-900">Department:</span>{" "}
                        {f.department || "N/A"}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium text-gray-900">Graduated:</span>{" "}
                        {f.graduated_institution || "N/A"}
                    </p>
                    <p className="text-gray-700 break-words">
                        <span className="font-medium text-gray-900">Courses:</span>{" "}
                        {f.courses || "N/A"}
                    </p>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        {/* Edit Button */}
                        <button
                            onClick={() => navigate(`/admin/faculty/edit/${f.id}`)}
                            type="button"
                            className="w-full sm:w-auto flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-900 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                        >
                            Edit
                        </button>

                        {/* Delete Button */}
                        <button
                            onClick={() => {
                            const ok = window.confirm(`Are you sure you want to delete ${f.name}?`);
                            if (ok) deleteFaculty(f.id);
                            }}
                            type="button"
                            className="w-full sm:w-auto flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 shadow-sm"
                        >
                            Delete
                        </button>
                        </div>
                </div>
                ))}
            </div>

            {/* Empty state */}
            {faculty.length === 0 && !msg && (
                <div className="mt-8 text-center text-gray-600">
                No faculty found.
                </div>
            )}
            </div>
        </div>
    {/* <Footer/> */}
    </div>
  )
}

export default ManageFaculty
