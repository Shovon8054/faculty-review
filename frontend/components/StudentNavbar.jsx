import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function StudentNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try {
        await axios.post(
            "http://localhost:8080/api/logout",
            {},
            { withCredentials: true }
        );
        } catch (err) {
        console.log("Logout error", err);
        }
        navigate("/");
    };

    const linkClass = (path) =>
        `px-3 py-2 rounded-lg transition ${
        location.pathname === path ? "bg-white/10" : "hover:bg-white/10"
        }`;



  return (
    <div>
        <nav className="bg-black text-white px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
            
            <div className="min-w-0">
                <div className="font-semibold leading-5 truncate">BRACU Faculty Portal</div>
                <div className="text-xs text-white/60 leading-4 truncate">
                    Reviews • Queries • Ratings
                </div>
            </div>
           

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-2">
            <Link to="#" className={linkClass("/admin-dashboard")}>
                Queries
            </Link>

            <Link to="/student/faculty-with-review" className={linkClass("/admin-add-faculty")}>
                Faculty
            </Link>

            <Link
                to="#"
                className={linkClass("/admin-manage-faculty")}
            >
                Profile
            </Link>


            <button
                type="button"
                onClick={handleLogout}
                className="ml-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
                Logout
            </button>
            </div>

            {/* Mobile menu button */}
            <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/20 px-3 py-2 hover:bg-white/10 transition"
            aria-label="Toggle menu"
            aria-expanded={open}
            >
            {/* Hamburger / X icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                {open ? (
                <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                ) : (
                <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                )}
            </svg>
            </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
            <div className="md:hidden mt-4 border-t border-white/10 pt-3">
            <div className="flex flex-col gap-2">
                <Link
                to="/admin-dashboard"
                className={linkClass("/admin-dashboard")}
                onClick={() => setOpen(false)}
                >
                Dashboard
                </Link>

                <Link
                to="/admin-add-faculty"
                className={linkClass("/admin-add-faculty")}
                onClick={() => setOpen(false)}
                >
                Add Faculty
                </Link>

                <Link
                to="/admin-manage-faculty"
                className={linkClass("/admin-manage-faculty")}
                onClick={() => setOpen(false)}
                >
                Manage Faculty
                </Link>

                <Link
                to="/admin"
                className={linkClass("/admin")}
                onClick={() => setOpen(false)}
                >
                Manage Users
                </Link>

                <button
                type="button"
                onClick={handleLogout}
                className="mt-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                Logout
                </button>
            </div>
            </div>
        )}
        </nav>
    </div>
  );
}