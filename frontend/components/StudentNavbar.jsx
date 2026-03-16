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

const linkClass = (path) => {
  const isActive = location.pathname === path;

  return `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-white text-[#2563EB] shadow-sm"
      : "text-white hover:bg-[#1E293B] hover:text-[#38BDF8]"
  }`;
};

return (
  <div className="bg-[#F8FAFC]">
    <nav className="bg-[#2563EB] px-4 sm:px-6 lg:px-8 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">

          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow">
              <span className="text-[#2563EB] font-bold text-sm">BFP</span>
            </div>

            <div className="leading-tight">
              <div className="font-semibold text-white text-sm sm:text-base">
                BRACU Faculty Portal
              </div>

              <div className="text-xs text-[#38BDF8] flex items-center gap-1">
                <span>Reviews</span>
                <span className="text-white/40">•</span>
                <span>Queries</span>
                <span className="text-white/40">•</span>
                <span>Ratings</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">

            <Link
              to="/student/queries"
              className={linkClass("/student/queries")}
            >
              Posts
            </Link>

            <Link
              to="/student/faculty-with-review"
              className={linkClass("/student/faculty-with-review")}
            >
              Faculty
            </Link>

            <Link
              to="/student/profile"
              className={linkClass("/student/profile")}
            >
              Profile
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="ml-2 flex items-center gap-2 px-4 py-2 bg-[#1E293B] text-white rounded-lg hover:bg-[#38BDF8] hover:text-[#1E293B] transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              Logout
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-white hover:bg-[#1E293B] rounded-lg transition"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>

        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">

              <Link
                to="/student/queries"
                className={linkClass("/student/queries") + " block"}
                onClick={() => setOpen(false)}
              >
                Posts
              </Link>

              <Link
                to="/student/faculty-with-review"
                className={linkClass("/student/faculty-with-review") + " block"}
                onClick={() => setOpen(false)}
              >
                Faculty
              </Link>

              <Link
                to="/student/profile"
                className={linkClass("/student/profile") + " block"}
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>

              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 bg-[#1E293B] text-white rounded-lg hover:bg-[#38BDF8] hover:text-[#1E293B] transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>

                Logout
              </button>

            </div>
          </div>
        )}

      </div>
    </nav>
  </div>
);
}