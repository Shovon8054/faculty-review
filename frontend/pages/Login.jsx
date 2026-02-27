import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate=useNavigate();
    const handleSubmit=()=>{
        navigate("/home")
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h3 className="text-2xl font-semibold text-center mb-6">LOGIN</h3>

        <div className="space-y-4">
            <input
            type="email"
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
            Login
            </button>
        </div>

        <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Don&apos;t have an account?</p>
            <Link
            to="/signin"
            className="inline-block mt-2 text-sm font-medium text-black underline underline-offset-4"
            >
            Sign In
            </Link>
        </div>
        </div>
    </div>
  )
}

export default Login
