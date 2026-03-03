import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import StudentNavbar from "../../components/StudentNavbar";

export default function AddRating() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    teaching: "5",
    marking: "5",
    behaviour: "5",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [faculties, setFaculties] = useState([]);

  
  const fetchFaculties = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/student/faculty-with-review",
        { withCredentials: true }
      );
      setFaculties(res.data); 
    } catch (err) {
      console.error("Error fetching faculties:", err);
    }
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await axios.post(
        `http://localhost:8080/api/student/add-rating/${id}`,
        {
          teaching: Number(form.teaching),
          marking: Number(form.marking),
          behaviour: Number(form.behaviour),
        },
        { withCredentials: true }
      );

      console.log("submit response:", res.data);
      alert("Review submitted!");

      
      fetchFaculties();
      navigate("/student/faculty-with-review"); 
    } catch (err) {
      console.log("submit error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Request failed");
    } 
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
    <StudentNavbar />

        <div className="mx-auto max-w-md px-4 py-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div>
                <h2 className="text-lg font-semibold text-gray-900">Add Review</h2>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
                <p className="text-sm font-medium text-red-800">Something went wrong</p>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-900">Teaching</label>
                <select
                    name="teaching"
                    value={form.teaching}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400"
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-900">Marking</label>
                <select
                    name="marking"
                    value={form.marking}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400"
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-900">Behaviour</label>
                <select
                    name="behaviour"
                    value={form.behaviour}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400"
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </div>

                {/* Actions */}
                <div className="pt-2">
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? "Submitting..." : "Submit Review"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mt-3 w-full rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                    Cancel
                </button>
                </div>
            </form>
            </div>
        </div>
    </div>
  );
}