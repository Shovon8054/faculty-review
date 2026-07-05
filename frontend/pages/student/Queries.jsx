import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "../../components/StudentNavbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const Queries = () => {

  const navigate=useNavigate();


  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");
  const [posts, setPosts] = useState([]);

  const currentUser=JSON.parse(localStorage.getItem("user"))
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <StudentNavbar />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* post form */}
        <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Student Queries</h2>
            <p className="text-sm text-slate-500 mt-0.5">Share your question with the community</p>
          </div>

          {msg && (
            <div className="mb-4 rounded-xl bg-blue-50/80 px-4 py-3 text-sm text-blue-700 backdrop-blur-sm border border-blue-100">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {msg}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 focus-within:border-slate-300 focus-within:bg-white transition-all">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What's on your mind?"
                className="min-h-[80px] w-full resize-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                rows="3"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                <span>Post Query</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* queries list */}
        <div>
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                All Queries
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Recent discussions from students
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
              >
                {/* header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* left - user info */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-sm font-medium text-white shadow-sm">
                      {post.name ? post.name.charAt(0).toUpperCase() : "U"}
                    </div>

                    <div className="min-w-0">
                      <p className="text-base font-semibold text-slate-900 truncate">
                        {post.name || "Unknown User"}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-500 truncate">{post.email}</p>
                    </div>
                  </div>

                  {/* right - metadata and actions */}
                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    {post.created_at && (
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200/60">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(post.created_at).toLocaleString()}
                      </div>
                    )}

                    {post.isOwner && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/student/queries/edit/${post.id}`)}
                          type="button"
                          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(post.id)}
                          type="button"
                          className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 transition-all hover:bg-red-100 hover:text-red-700 hover:border-red-300"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* content */}
                <div className="mt-5">
                  <div className="rounded-xl bg-slate-50/70 p-5 border border-slate-100">
                    <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-slate-700">
                      {post.body}
                    </p>
                  </div>

                  {/* comment/discussion button */}
                  <div className="mt-5 flex items-center gap-4">
                    <button
                      onClick={() => navigate(`/student/comment/${post.id}`)}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Join Discussion
                    </button>
                    
                  </div>
                </div>
              </div>
            ))}

            {posts.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-4">
                  <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900">No queries yet</h3>
                <p className="text-sm text-slate-500 mt-1">Be the first to start a discussion</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Queries;