import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Comment = () => {
  const { id } = useParams(); // ✅ call useParams
  const navigate = useNavigate();

  const [body, setBody] = useState("");

  const postComment = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/comment", // ✅ match backend
        { queryId: id, body: body },
        { withCredentials: true }
      );

      setBody("");
    } catch (err) {
      console.error(err.response?.status, err.response?.data);
    }
  };

  return (
    <div className="p-2 max-w-md mx-auto space-y-4">
      <div className="text-lg font-semibold">Comment Here</div>

      <div className="flex gap-2">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="1"
          placeholder="Write your comment..."
        />
        <button
          onClick={postComment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Comment
        </button>
      </div>

      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Like
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Comment;