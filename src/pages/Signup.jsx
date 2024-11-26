import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk mengontrol password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State untuk confirm password visibility
  const [error, setError] = useState("");
  const [suggestedEmails, setSuggestedEmails] = useState([]);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const emailDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com"];

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value.includes("@")) {
      setSuggestedEmails([]);
    } else {
      const suggestions = emailDomains.map((domain) => value + domain);
      setSuggestedEmails(suggestions);
    }
  };

  const handleEmailSuggestionClick = (suggestion) => {
    setEmail(suggestion);
    setSuggestedEmails([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!username || !gender) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((user) => user.email === email)) {
      setError("Email is already registered");
      return;
    }
  
    const newUser = {
      email,
      username,
      gender,
      password,
      role: "user",
      lastLogin: new Date().toLocaleString(),
      createdAt: new Date().toLocaleString(), // Tambahkan tanggal pembuatan akun
    };
  
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));
  
    // alert("Signup successful");
    navigate("/login");
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
          Create Your Account
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-400 focus:border-gray-400"
                  : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            />
          </div>

          {/* Email */}
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
              type="text"
              value={email}
              onChange={handleEmailChange}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-400 focus:border-gray-400"
                  : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            />
            {suggestedEmails.length > 0 && (
              <ul
                className={`mt-2 rounded-lg shadow-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-300"
                    : "bg-white border-gray-300"
                }`}
              >
                {suggestedEmails.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`px-4 py-2 cursor-pointer ${
                      darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleEmailSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-400 focus:border-gray-400"
                  : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Password */}
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-400 focus:border-gray-400"
                    : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-400 focus:border-gray-400"
                    : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-3 top-2.5 text-lg ${
                  darkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-800"
                }`}
                title={showConfirmPassword ? "Hide Password" : "Show Password"}
              >
                <span className="material-icons">
                  {showConfirmPassword ? "visibility_off" : "visibility"}
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
            Sign Up
          </button>
        </form>
        <p
          className={`text-sm text-center mt-4 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Already have an account?{" "}
          <a
            href="/login"
            className={`hover:underline ${
              darkMode ? "text-gray-300" : "text-blue-600"
            }`}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
