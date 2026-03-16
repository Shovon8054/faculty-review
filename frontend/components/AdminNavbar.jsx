import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function AdminNavbar() {
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
  return `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
    isActive 
      ? 'bg-white text-[#2563EB]' 
      : 'text-white hover:bg-[#3B82F6]'
  }`;
};

return (
  <nav className="bg-[#2563EB] px-4 sm:px-6 lg:px-8 py-3 shadow-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        {/* Left side with logo/brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm transform transition-transform hover:scale-105 duration-200">
            <span className="text-[#2563EB] font-bold text-sm">BFP</span>
          </div>
          <div>
            <div className="font-semibold text-white leading-5">BRACU Faculty Portal</div>
            <div className="text-xs text-white/80 leading-4 flex items-center gap-1.5">
              <span className="hover:text-white transition-colors cursor-default">Reviews</span>
              <span className="text-white/40 text-lg">•</span>
              <span className="hover:text-white transition-colors cursor-default">Queries</span>
              <span className="text-white/40 text-lg">•</span>
              <span className="hover:text-white transition-colors cursor-default">Ratings</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <Link 
            to="/admin-dashboard" 
            className={linkClass("/admin-dashboard")}
          >
            Posts
          </Link>

          <Link 
            to="/admin-add-faculty" 
            className={linkClass("/admin-add-faculty")}
          >
            Add Faculty
          </Link>

          <Link
            to="/admin-manage-faculty"
            className={linkClass("/admin-manage-faculty")}
          >
            Manage Faculty
          </Link>

          <Link 
            to="/admin/users" 
            className={linkClass("/admin/users")}
          >
            Manage Users
          </Link>

          <div className="ml-3 pl-3 border-l border-white/30">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#0B1D4B] rounded-lg hover:bg-[#0A173D] transition-colors duration-200 group shadow-sm"
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
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
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-white hover:bg-[#3B82F6] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#2563EB]"
          aria-label="Toggle menu"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
            strokeLinecap="round"
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

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/30">
          <div className="flex flex-col space-y-1 bg-[#2563EB] rounded-xl p-2 border border-white/20">
            <Link
              to="/admin-dashboard"
              className={linkClass("/admin-dashboard") + " w-full text-left"}
              onClick={() => setOpen(false)}
            >
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Posts
              </span>
            </Link>

            <Link
              to="/admin-add-faculty"
              className={linkClass("/admin-add-faculty") + " w-full text-left"}
              onClick={() => setOpen(false)}
            >
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Add Faculty
              </span>
            </Link>

            <Link
              to="/admin-manage-faculty"
              className={linkClass("/admin-manage-faculty") + " w-full text-left"}
              onClick={() => setOpen(false)}
            >
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Manage Faculty
              </span>
            </Link>

            <Link
              to="/admin/users"
              className={linkClass("/admin/users") + " w-full text-left"}
              onClick={() => setOpen(false)}
            >
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Manage Users
              </span>
            </Link>

            <div className="pt-2 mt-1 border-t border-white/20">
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-white hover:bg-[#3B82F6] rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </nav>
);
}