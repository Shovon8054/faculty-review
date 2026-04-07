import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import axios from "axios";
// import Footer from "../../components/Footer";

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
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="max-w-3xl mx-auto mt-6 space-y-4 px-4 sm:px-6 lg:px-0">
        {posts.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-semibold text-gray-800">{p.name}</p>
                <p className="text-sm text-gray-500">{p.email}</p>
              </div>

              <p className="text-xs text-gray-400">
                {new Date(p.created_at).toLocaleString()}
              </p>
            </div>

            {/* Body */}
            <p className="text-gray-700 text-sm leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No posts available
          </div>
        )}
      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default AdminDashboard
