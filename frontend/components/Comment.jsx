import { use } from "react";
import StudentNavbar from "./StudentNavbar";
import { useNavigate } from "react-router-dom";

const Comment = () => {
    const navigate=useNavigate()
  return (
    <div className="p-2 max-w-md mx-auto space-y-4">

        <div className="text-lg font-semibold">Comment Here</div>

        {/* Textarea + Comment button side by side */}
        <div className="flex gap-2">
            <textarea
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="1"
            placeholder="Write your comment..."
            ></textarea>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Comment
            </button>
        </div>

        <p className="text-gray-700">Likes: 0</p>

        <div className="flex gap-2">
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
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
  )
}

export default Comment
