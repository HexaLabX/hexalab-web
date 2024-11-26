import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle hamburger menu visibility

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-8 px-4 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}
    >
      {/* Header */}
      <div
        className={`w-full max-w-6xl py-6 px-6 flex flex-wrap items-center justify-between rounded-lg ${darkMode ? "bg-gray-800 shadow-md" : "bg-blue-600 shadow-lg"}`}
      >
        <div className="flex items-center space-x-4">
          <img
            src="/videos/Avatar.jpg"
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-white shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <div>
            <h2 className="text-3xl font-bold flex items-center space-x-2">
              <span>{user.username}</span>
            </h2>
            <p className="text-lg font-medium">{user.role}</p>
          </div>
        </div>

        {/* Hamburger Menu */}
        <div className="flex md:hidden items-center">
          <button
            onClick={handleHamburgerClick}
            className={`p-2 ${darkMode ? "text-white" : "text-black"} transition-transform transform ${isMenuOpen ? "rotate-45" : ""}`}
            title="Toggle Menu"
          >
            <span className={`material-icons text-3xl ${isMenuOpen ? "rotate-45" : ""}`}>
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Desktop Buttons (Visible Only on Desktop) */}
        <div className="hidden md:flex space-x-6 mt-4 md:mt-0">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg transition transform hover:scale-110 ${darkMode ? "border-gray-600 text-gray-200 hover:border-gray-400" : "border-gray-300 text-gray-800 hover:border-gray-500"}`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="material-icons text-2xl">{darkMode ? "dark_mode" : "light_mode"}</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-12 h-12 flex items-center justify-center border-2 border-red-500 text-red-500 rounded-lg hover:border-red-600 hover:text-red-600 transition transform hover:scale-110"
            title="Logout"
          >
            <span className="material-icons text-2xl">logout</span>
          </button>

          {/* Message Icon */}
          <button
            onClick={handleToggleModal}
            className="w-12 h-12 flex items-center justify-center border-2 rounded-lg transition transform hover:scale-110"
            title="Message Admin"
          >
            <span className="material-icons text-2xl">message</span>
          </button>
        </div>
      </div>

      {/* Hamburger Menu Content (Visible Only on Mobile) */}
      {isMenuOpen && (
        <div
          className={`md:hidden w-full p-4 rounded-lg mt-4 transition-all duration-300 ease-in-out transform ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}
        >
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full py-2 mb-2 flex items-center justify-start space-x-2 hover:bg-gray-700 transition"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="material-icons text-xl">{darkMode ? "dark_mode" : "light_mode"}</span>
            <span>Toggle Dark Mode</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full py-2 mb-2 flex items-center justify-start space-x-2 hover:bg-red-600 transition"
            title="Logout"
          >
            <span className="material-icons text-xl">logout</span>
            <span>Logout</span>
          </button>

          {/* Message Button */}
          <button
            onClick={handleToggleModal}
            className="w-full py-2 flex items-center justify-start space-x-2 hover:bg-blue-600 transition"
            title="Message Admin"
          >
            <span className="material-icons text-xl">message</span>
            <span>Message Admin</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full max-w-6xl mt-8">
        <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
          <h3 className="text-2xl font-semibold mb-6 border-b pb-4 flex items-center space-x-2">
            <span className="material-icons text-blue-500">info</span>
            <span>Profile Details</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Profile Details */}
            <div className="flex flex-col">
              <span className="text-lg font-medium flex items-center space-x-2">
                <span className="material-icons text-blue-500">person</span>
                <span>Username</span>
              </span>
              <span className="text-xl font-semibold">{user.username}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium flex items-center space-x-2">
                <span className="material-icons text-blue-500">email</span>
                <span>Email</span>
              </span>
              <span className="text-xl font-semibold">{user.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium flex items-center space-x-2">
                <span className="material-icons text-blue-500">wc</span>
                <span>Gender</span>
              </span>
              <span className="text-xl font-semibold">{user.gender}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium flex items-center space-x-2">
                <span className="material-icons text-blue-500">supervised_user_circle</span>
                <span>Role</span>
              </span>
              <span className="text-xl font-semibold">{user.role}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium flex items-center space-x-2">
                <span className="material-icons text-blue-500">event</span>
                <span>Created At</span>
              </span>
              <span className="text-xl font-semibold">{user.createdAt || "Unknown"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup for Message Options */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`bg-white dark:bg-gray-800 rounded-lg p-6 w-80 ${darkMode ? "text-gray-200" : "text-gray-800"}`}
          >
            <h2 className="text-xl font-semibold mb-4">How would you like to contact the admin?</h2>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => window.location.href = "https://t.me/Hexa415"}
                  className="w-full py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  <span className="material-icons text-white mr-2">chat</span> Contact via Telegram
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.location.href = "https://discord.com/users/rzadrmwan"}
                  className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  <span className="material-icons text-white mr-2">discord</span> Contact via Discord
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.location.href = "mailto:obpstlg@gmail.com"}
                  className="w-full py-2 px-4 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition"
                >
                  <span className="material-icons text-white mr-2">email</span> Contact via Email
                </button>
              </li>
            </ul>
            <button
              onClick={handleToggleModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition"
            >
              <span className="material-icons text-2xl">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
