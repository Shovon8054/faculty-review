import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const Login = () => {
    const navigate=useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res= await axios.post("http://localhost:8080/api/login",
                {email, password},
                { withCredentials: true })
            

            if (res.data.user.role==="admin"){
                navigate("/admin-dashboard")
            }else{
                navigate("/student/queries")
            }

        } catch(err){
            setMsg(err.response?.data?.message || "Login failed");
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
    <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-center mb-6 text-[#2563EB]">
            LOGIN
        </h3>

        <div className="space-y-4">
            {/* Email */}
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#1E293B] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#38BDF8] transition"
            />

            {/* Password */}
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#1E293B] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#38BDF8] transition"
            />

            {/* Message */}
            {msg && <p className="text-sm text-center text-red-600">{msg}</p>}

            {/* Button */}
            <button
            type="submit"
            className="w-full bg-[#2563EB] text-white rounded-lg py-2 font-medium hover:bg-[#3B82F6] active:scale-[0.98] transition-transform duration-150"
            >
            Login
            </button>
        </div>

        <div className="mt-6 text-center">
            <p className="text-sm text-[#1E293B]">Don&apos;t have an account?</p>
            <Link
            to="/signin"
            className="inline-block mt-2 text-sm font-medium text-[#38BDF8] underline underline-offset-4 hover:text-[#2563EB] transition-colors"
            >
            Sign In
            </Link>
        </div>
        </div>
    </form>
    </div>
  )
}

export default Login
