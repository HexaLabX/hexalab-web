import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VideoList from "./components/VideoList";
import Profile from "./components/Profile";
import AdminPanel from "./components/AdminPanel";
import ChatBot from "./components/ChatBot";  // Import halaman Chatbot
import { useContext } from "react";
import AuthContext from "./context/AuthContext"; // Pastikan default import digunakan dengan benar

const App = () => {
  const { user } = useContext(AuthContext); // Mendapatkan user dari context

  // Fungsi untuk mengecek akses Private Route
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      {/* Navbar ditampilkan di setiap halaman */}
      <Navbar />

      {/* Routing utama */}
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/videos" element={<PrivateRoute><VideoList /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
        <Route path="/chatbot" element={<PrivateRoute><ChatBot /></PrivateRoute>} /> {/* Route Chatbot */}
      </Routes>
    </Router>
  );
};

export default App;
