import { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Comment = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [body, setBody] = useState("");
  const [comment, setComment]=useState([])
  const [user, setUser]=useState(null)

  // useEffect
  useEffect(()=>{
    fetchUser();
    fetchComment();
  },[id])

  // fetch user
  const fetchUser=async()=>{
    try{
      const res=await axios.get(
        "http://localhost:8080/api/me",
        {withCredentials:true}
      )
      setUser(res.data)

    } catch(err){
      console.error(err)
      
    }
  }

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

  // delete comment function
  const deleteComment = async (id) => {
    try {

      await axios.delete(
        `http://localhost:8080/api/comment/${id}`,
        { withCredentials: true }
      );

      fetchComment();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">

      
      <div className="space-y-3">
        {comment.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {/* name and delete button */}
            <div className="flex items-start justify-between">
              <p className="font-semibold text-gray-800">{c.name}</p>

              {user?.id === c.user_id && (
                <button
                  onClick={() => deleteComment(c.id)}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              )}
            </div>

            {/* Comment body */}
            <p className="text-gray-700 mt-2 leading-relaxed">{c.body}</p>


            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-400">
                {new Date(c.created_at).toLocaleString()}
              </p>

              <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Like
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comment*/}
      <div className="space-y-2">
        <p className="text-lg font-semibold text-gray-800">Comment Here</p>

        <div className="flex gap-2">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="1"
            placeholder="Write your comment..."
          />

          <button
            onClick={postComment}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Comment
          </button>
        </div>
      </div>

      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
        >
          Back
        </button>
      </div>

    </div>
  );
};

export default Comment;