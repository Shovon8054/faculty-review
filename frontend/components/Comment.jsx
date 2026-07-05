import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import Footer from "./Footer";

const Comment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);
  const [query, setQuery] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchComment();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/me", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComment = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/comment/${id}`, {
        withCredentials: true,
      });
      // API returns a plain array of comments
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const postComment = async () => {
    if (!body.trim()) return;
    try {
      await axios.post(
        "http://localhost:8080/api/comment",
        { queryId: id, body },
        { withCredentials: true }
      );
      setBody("");
      fetchComment();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/comment/${commentId}`, {
        withCredentials: true,
      });
      fetchComment();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <StudentNavbar />

      <div className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Original Query Card */}
        {query && (
          <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Original Post</p>
            <p className="text-base leading-relaxed text-slate-800 whitespace-pre-wrap break-words">
              {query.body}
            </p>
            <p className="text-xs text-slate-400 mt-3">
              {new Date(query.created_at).toLocaleString()}
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Discussion
            <span className="ml-2 text-sm font-normal text-slate-400">
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </span>
          </h2>

          {comments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
              <p className="text-sm text-slate-500">No comments yet. Be the first to reply!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                        {(c.name ?? "?")[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                        <p className="text-xs text-slate-400">
                          {new Date(c.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {user?.id === c.user_id && (
                      <button
                        onClick={() => deleteComment(c.id)}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    )}
                  </div>

                  <p className="text-[15px] leading-relaxed text-slate-700 whitespace-pre-wrap break-words">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Comment Box */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-700 mb-3">Write a comment</p>
          <div className="flex gap-3 items-end">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows="3"
              placeholder="Share your thoughts..."
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            />
            <button
              onClick={postComment}
              className="px-5 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl shadow-sm hover:bg-blue-700 transition-all"
            >
              Post
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-5">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Posts
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Comment;