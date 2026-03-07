import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "../../components/StudentNavbar";
import { useNavigate } from "react-router-dom";

const Queries = () => {

  const navigate=useNavigate();


  const [body, setBody] = useState("");
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

  // Load queries on page load
  useEffect(() => {
    fetchQueries();
  }, []);

  // =====================================Submit new query===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!body.trim()) {
      setMsg("Query body is required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/student/queries",
        { body },
        { withCredentials: true }
      );

      setBody("");
      setMsg("Post added successfully");
      fetchQueries();
    } catch (err) {
      console.error(err);
      setMsg("Failed to create query");
    }
  };

  // ======================delete query===================================
  const handleDelete=async(id)=>{
    try{
      await axios.delete(`http://localhost:8080/api/queries/${id}`,
        {withCredentials:true}
      )
      setPosts((prev)=>prev.filter((p)=>p.id!==id));
      alert("Deleted")
    } catch(error){
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <StudentNavbar />

      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* post form */}
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3">
            <h2 className="text-lg font-semibold text-slate-900">Student Queries</h2>
            <p className="text-xs text-slate-500">Share your question here</p>
        </div>

        {msg && (
            <p className="mb-3 rounded-xl bg-blue-50 px-3 py-2 text-xs text-blue-700">
            {msg}
            </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write something..."
                className="min-h-[70px] w-full resize-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                rows="3"
            ></textarea>
            </div>

            <div className="flex justify-end">
                <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg active:translate-y-0"
                >
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    Post
                </span>
                <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1">
                    →
                </span>
                </button>
            </div>
        </form>
        </div>

        {/* queries list */}
        <div>
            <div className="mb-5 border-b border-slate-200 pb-3">
                <h3 className="text-xl font-semibold tracking-tight text-slate-800">
                    All Queries
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    Recent posts from students
                </p>
            </div>

            <div className="space-y-5">
                {posts.map((post) => (
                <div
                    key={post.id}
                    className="group rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                    {/* header */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                  {/* left */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-semibold uppercase text-slate-700 shadow-sm">
                      {post.name ? post.name.charAt(0) : "U"}
                    </div>

                    <div>
                      <p className="text-[15px] font-semibold tracking-tight text-slate-900">
                        {post.name || "Unknown User"}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-500">{post.email}</p>
                    </div>
                  </div>

                  {/* right */}
                  <div className="flex flex-col items-end gap-2">
                    {post.created_at && (
                      <div className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500">
                        {new Date(post.created_at).toLocaleString()}
                      </div>
                    )}

                    <div className="flex items-center gap-2">

                    {/* edit button */}
                      <button
                      onClick={()=>{navigate(`/student/queries/edit/${post.id}`)}}
                        type="button"
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                      >
                        Edit
                      </button>
                    
                    {/* delete button */}
                      <button
                        onClick={()=>{handleDelete(post.id)}}
                        type="button"
                        className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                    {/* body */}
                    <div className="pt-5">

                    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                        <p className="whitespace-pre-wrap break-words text-[15px] leading-7 text-slate-700">
                        {post.body}
                        </p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        {/* ================= */}
      </div>
    </div>
  );
};

export default Queries;