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
  return `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
    isActive 
      ? 'bg-[#D4AF37] text-[#0A1929]' 
      : 'text-[#D4AF37] hover:text-[#FFD700] hover:bg-[#1A2B3F]'
    }`;
  };

  return (
    <nav className="bg-[#0A1929] shadow-lg border-b border-[#1A2B3F] px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Left side with logo/brand */}
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#D4AF37] to-[#996515] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                <span className="text-[#0A1929] font-semibold text-sm">BFP</span>
              </div>
              <div>
                <div className="font-semibold text-white leading-5 truncate">BRACU Faculty Portal</div>
                <div className="text-xs text-[#D4AF37]/80 leading-4 truncate flex items-center gap-1">
                  <span className="hover:text-[#D4AF37] transition-colors">Reviews</span>
                  <span className="text-[#1A2B3F]">•</span>
                  <span className="hover:text-[#D4AF37] transition-colors">Queries</span>
                  <span className="text-[#1A2B3F]">•</span>
                  <span className="hover:text-[#D4AF37] transition-colors">Ratings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link 
              to="/admin-dashboard" 
              className={linkClass("/admin-dashboard")}
            >
              <span>Posts</span>
            </Link>

            <Link 
              to="/admin-add-faculty" 
              className={linkClass("/admin-add-faculty")}
            >
              <span>Add Faculty</span>
            </Link>

            <Link
              to="/admin-manage-faculty"
              className={linkClass("/admin-manage-faculty")}
            >
              <span>Manage Faculty</span>
            </Link>

            <Link 
              to="/admin/users" 
              className={linkClass("/admin/users")}
            >
              <span>Manage Users</span>
            </Link>

            <div className="ml-2 pl-2 border-l border-[#1A2B3F]">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-[#D4AF37] hover:text-[#FFD700] rounded-lg hover:bg-[#1A2B3F] transition-all duration-200 group"
              >
                <svg 
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" 
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
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#D4AF37] hover:text-[#FFD700] hover:bg-[#1A2B3F] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
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
          <div className="md:hidden mt-4 pt-4 border-t border-[#1A2B3F] animate-[slideDown_0.2s_ease-out]">
            <div className="flex flex-col space-y-1">
              <Link
                to="/admin-dashboard"
                className={linkClass("/admin-dashboard") + " block px-3 py-2.5 rounded-lg"}
                onClick={() => setOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span className="text-white">Posts</span>
                </span>
              </Link>

              <Link
                to="/admin-add-faculty"
                className={linkClass("/admin-add-faculty") + " block px-3 py-2.5 rounded-lg"}
                onClick={() => setOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span className="text-white">Add Faculty</span>
                </span>
              </Link>

              <Link
                to="/admin-manage-faculty"
                className={linkClass("/admin-manage-faculty") + " block px-3 py-2.5 rounded-lg"}
                onClick={() => setOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-white">Manage Faculty</span>
                </span>
              </Link>

              <Link
                to="/admin/users"
                className={linkClass("/admin/users") + " block px-3 py-2.5 rounded-lg"}
                onClick={() => setOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-white">Manage Users</span>
                </span>
              </Link>

              <div className="pt-2 mt-2 border-t border-[#1A2B3F]">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-[#D4AF37] hover:text-[#FFD700] rounded-lg hover:bg-[#1A2B3F] transition-all duration-200"
                >
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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