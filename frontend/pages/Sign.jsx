import { useNavigate } from "react-router-dom"
const Sign = () => {
    const navigate=useNavigate()
    const handleSubmit=()=>{

        navigate("/");
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">SIGNIN</h2>

        <div className="space-y-4">
        <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
        />
        <input
            type="text"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
        />
        <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
        />

        <button
            onClick={handleSubmit}
            className="w-full bg-black text-white rounded-lg py-2 font-medium hover:opacity-90 active:scale-[0.99]"
        >
            Register
        </button>
        </div>
    </div>
    </div>
  )
}

export default Sign
