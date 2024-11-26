import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk kontrol visibility password
  const { login } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`shadow-lg rounded-lg p-8 max-w-sm w-full ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
        }`}
      >
        <h2
          className={`text-2xl font-semibold text-center mb-6 ${
            darkMode ? "text-white" : "text-blue-600"
          }`}
        >
          Login
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-400 focus:border-gray-400"
                  : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Kondisi untuk menampilkan password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-400 focus:border-gray-400"
                    : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                required
              />
              {/* Toggle Show Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                className={`absolute right-3 top-2.5 text-lg ${
                  darkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-800"
                }`}
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                <span className="material-icons">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg shadow-md transition focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500"
                : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
            }`}
          >
            Login
          </button>
        </form>
        <p
          className={`text-sm text-center mt-4 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Don't have an account?{" "}
          <a
            href="/signup"
            className={`hover:underline ${
              darkMode ? "text-gray-300" : "text-blue-600"
            }`}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
