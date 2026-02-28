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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleSubmit}>
            <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
                    <h2 className="text-2xl font-semibold text-center mb-6">SIGNIN</h2>

                    <div className="space-y-4">
                    {/* name */}
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                    />
                    {/* email */}
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                    />
                    {/* password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                    />
                    {msg && <p className="text-sm text-center text-red-600">{msg}</p>}
                    <button
                        type="submit"
                        className="w-full bg-black text-white rounded-lg py-2 font-medium hover:opacity-90 active:scale-[0.99]"
                    >
                        Register
                    </button>
                    <p
                    className="text-sm text-center text-gray-600 cursor-pointer hover:underline"
                    onClick={() => navigate("/signin")}
                    >
                        Already have an account? Sign in
                    </p>
                    </div>
            </div>
        </form>
    </div>
  )
}

export default Sign
