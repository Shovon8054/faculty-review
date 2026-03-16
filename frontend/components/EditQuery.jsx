import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import Footer from "./Footer";

const EditQuery = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchSinglePost();
  }, [id]);

  // fetch single post
  const fetchSinglePost = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/student/queries/${id}`,
        { withCredentials: true }
      );
      setBody(res.data.body);
    } catch (err) {
      console.error(err);
      setMsg("Failed to load query");
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!body.trim()) {
      setMsg("post missing");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/student/queries/${id}`,
        { body },
        { withCredentials: true }
      );

      navigate("/student/queries");
    } catch (error) {
      console.error(error);
      setMsg("Failed to update query");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <StudentNavbar />

      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Header */}
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Edit Query</h2>
          <p className="mb-4 text-sm text-slate-500">
            Update your query and save changes
          </p>

          {/* Message */}
          {msg && (
            <p className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              {msg}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows="6"
              placeholder="Edit your query..."
              className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors duration-200"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors duration-200"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => navigate("/student/queries")}
                className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditQuery;