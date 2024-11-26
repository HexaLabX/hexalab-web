import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";

const Home = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/videos"); // Navigasi ke halaman Videos
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-8 px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Hero Section */}
      <div
        className={`w-full max-w-6xl p-6 rounded-lg shadow-md mb-6 ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
        }`}
      >
        <h1
          className={`text-4xl font-bold text-center mb-4 ${
            darkMode ? "text-white" : "text-blue-600"
          }`}
        >
          Welcome to HexaLab
        </h1>
        <p className="text-lg text-center leading-relaxed">
          HexaLab is your gateway to mastering the world of{" "}
          <strong>Cyber Security</strong>. Founded by the{" "}
          <strong>HexaLab Team</strong> on <strong>November 24, 2024</strong>,
          this platform is dedicated to empowering learners with cutting-edge
          knowledge in cyber security.
        </p>
      </div>

      {/* About Section */}
      <div
        className={`w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg shadow-md ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
        }`}
      >
        <div>
          <h2
            className={`text-2xl font-semibold mb-4 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed">
            At HexaLab, we aim to create a secure digital world by nurturing
            skilled professionals who can tackle the challenges of modern cyber
            security. Our platform offers a variety of learning resources,
            including tutorials, videos, and hands-on projects.
          </p>
        </div>
        <div>
          <h2
            className={`text-2xl font-semibold mb-4 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Why Choose HexaLab?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span
                className={`material-icons mr-3 text-2xl ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                check_circle
              </span>
              <p>Comprehensive and practical tutorials for all levels.</p>
            </li>
            <li className="flex items-center">
              <span
                className={`material-icons mr-3 text-2xl ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                video_library
              </span>
              <p>Interactive videos and projects to enhance learning.</p>
            </li>
            <li className="flex items-center">
              <span
                className={`material-icons mr-3 text-2xl ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                people
              </span>
              <p>
                A community-driven approach to problem-solving and
                knowledge-sharing.
              </p>
            </li>
            <li className="flex items-center">
              <span
                className={`material-icons mr-3 text-2xl ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                update
              </span>
              <p>Stay updated with the latest trends in cyber security.</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Call to Action Section */}
      <div
        className={`w-full max-w-6xl p-6 rounded-lg shadow-md mt-6 ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-blue-600 text-white"
        }`}
      >
        <h3 className="text-2xl font-bold text-center mb-4">
          Ready to Start Your Cyber Security Journey?
        </h3>
        <p className="text-lg text-center mb-6">
          Join HexaLab today and become part of a thriving community dedicated
          to mastering the art of cyber security. Explore, learn, and grow with
          us.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleGetStarted}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              darkMode
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
