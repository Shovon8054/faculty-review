import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sign = () => {
    const navigate=useNavigate();

    const [name, setName]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [msg, setMsg]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setMsg("");

        try{
            const res= await axios.post("http://localhost:8080/api/register",{
                name,
                email,
                password,
            })

            setMsg("Registered")
            navigate("/");

        }catch(err){
            setMsg("Registration Failed")
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
    <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#2563EB]">
            SIGNIN
        </h2>

        <div className="space-y-4">
            {/* Name */}
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#1E293B] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#38BDF8] transition"
            />

            {/* Email */}
            <input
            type="text"
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

            {/* Error message */}
            {msg && <p className="text-sm text-center text-red-600">{msg}</p>}

            {/* Register button */}
            <button
            type="submit"
            className="w-full bg-[#2563EB] text-white rounded-lg py-2 font-medium hover:bg-[#3B82F6] active:scale-[0.98] transition-transform duration-150"
            >
            Register
            </button>

            {/* Login redirect */}
            <p
            className="text-sm text-center text-[#1E293B] cursor-pointer hover:text-[#2563EB] hover:underline transition-colors"
            onClick={() => navigate("/")}
            >
            Already have an account? Login
            </p>
        </div>
        </div>
    </form>
    </div>
  )
}

export default Sign
