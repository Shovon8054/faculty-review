import { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Comment = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [body, setBody] = useState("");
  const [comment, setComment]=useState([])

  // useEffect
  useEffect(()=>{
    fetchComment();
  },[id])

  // fetch comment
  const fetchComment=async()=>{
    try{
      const res=await axios.get(`http://localhost:8080/api/comment/${id}`,
        {withCredentials:true}
      );
      setComment(res.data)

    } catch(err){
      console.error(err)
    }
  }

    // post comment
  const postComment = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/comment",
        { queryId: id, body: body },
        { withCredentials: true }
      );

      setBody("");
      fetchComment();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-2 max-w-md mx-auto space-y-4">

      <div className="space-y-3">
        {comment.map((c) => (
          <div
            key={c.id}
            className="bg-white border rounded-lg p-3 shadow-sm"
          >
            {/* name */}
            <p className="font-semibold text-gray-800">{c.name}</p>

            {/* comment */}
            <p className="text-gray-700 mt-1">{c.body}</p>

            {/* time */}
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-400">
                {new Date(c.created_at).toLocaleString()}
              </p>

              {/* like button */}
              <button className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                Like
              </button>
            </div>
          </div>
        ))}
      </div>




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