import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserGraduate } from "react-icons/fa6";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-700 text-white px-6 py-4 flex items-center justify-between shadow fixed w-full z-50">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold flex items-center gap-2">
        <FaUserGraduate className="text-gray-900" />
        LMS Portal
      </Link>

      {/* Hamburger Icon (mobile) */}
      <div className="md:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Menu */}
      <div className={`absolute md:static top-16 left-0 w-full md:w-auto bg-indigo-700 md:flex items-center gap-6 text-sm transition-all duration-300 
        ${menuOpen ? "block" : "hidden"} md:block`}>

        {user ? (
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-0">
            <Link to="/users" className="hover:text-gray-300 text-lg">Users</Link>
            <Link to="/courses" className="hover:text-gray-300 text-lg">Courses</Link>
            <Link to="/payments" className="hover:text-gray-300 text-lg">Payments</Link>
            <Link to="/coupons" className="hover:text-gray-300 text-lg">Coupons</Link>

            <span className="text-indigo-200">Hi {user.name}</span>

            <button
              onClick={handleLogout}
              className="bg-red-800 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-0">
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="bg-white text-indigo-700 px-3 py-1 rounded hover:bg-indigo-100">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}