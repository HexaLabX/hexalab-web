import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";

const Navbar = () => {
  const { user } = useContext(AuthContext); // Mendapatkan user dari context
  const { darkMode } = useContext(ThemeContext); // Mendapatkan darkMode dari context
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false); // State untuk kontrol menu burger

  const toggleMenu = () => setMenuOpen(!menuOpen); // Fungsi untuk toggle menu burger

  return (
    <nav
      className={`shadow-lg sticky top-0 z-50 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between relative" style={{ height: "64px" }}>
        {/* Brand Logo */}
        <h1
          className={`text-2xl font-bold md:static md:transform-none ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          <Link to="/" className="hover:text-blue-400">HexaLab</Link>
        </h1>

        {/* Hamburger Menu Icon (Right Side) */}
        <button
          className="text-3xl md:hidden focus:outline-none absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={toggleMenu}
        >
          <span className={`material-icons ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
            {menuOpen ? "close" : "menu"}
          </span>
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute top-full left-0 w-full md:w-auto md:static md:flex flex-col md:flex-row md:space-x-4 items-center bg-gray-100 md:bg-transparent transition-all duration-300 ease-in-out ${
            menuOpen ? "flex" : "hidden"
          } ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
        >
          {!user && location.pathname === "/login" && (
            <li>
              <Link
                to="/signup"
                className="block px-4 py-2 flex items-center space-x-3 hover:text-blue-400"
                onClick={() => setMenuOpen(false)}
              >
                <span className="material-icons text-green-400">person_add</span>
                <span>Signup</span>
              </Link>
            </li>
          )}
          {!user && location.pathname === "/signup" && (
            <li>
              <Link
                to="/login"
                className="block px-4 py-2 flex items-center space-x-3 hover:text-blue-400"
                onClick={() => setMenuOpen(false)}
              >
                <span className="material-icons text-yellow-400">login</span>
                <span>Login</span>
              </Link>
            </li>
          )}
          {user && (
            <>
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 flex items-center space-x-3 hover:text-blue-400"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="material-icons text-blue-400">home</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/videos"
                  className="block px-4 py-2 flex items-center space-x-3 hover:text-blue-400"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="material-icons text-indigo-400">video_library</span>
                  <span>Videos</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 flex items-center space-x-3 hover:text-blue-400"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="material-icons text-purple-400">person</span>
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/chatbot"
                  className="block px-4 py-2 flex items-center space-x-3 hover:text-blue-400"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="material-icons text-teal-400">chat_bubble</span>
                  <span>ChatBot</span>
                </Link>
              </li>
              {user.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="block px-4 py-2 flex items-center space-x-3 hover:text-blue-400"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="material-icons text-red-400">admin_panel_settings</span>
                    <span>Admin</span>
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
