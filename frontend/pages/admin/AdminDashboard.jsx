import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import axios from "axios";

const AdminDashboard = () => {

  const [msg, setMsg] = useState("");
  const [posts, setPosts] = useState([]);

 
  // =========================Fetch all queries=============================
  const fetchQueries = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/student/queries", {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      setMsg("Failed to load queries");
    }
  };

  // Load queries
  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <div>
      <AdminNavbar/>
      <div className="max-w-3xl mx-auto mt-6 space-y-4">
        {posts.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold text-gray-800">{p.name}</p>
                <p className="text-sm text-gray-500">{p.email}</p>
              </div>

              <p className="text-xs text-gray-400">
                {new Date(p.created_at).toLocaleString()}
              </p>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
