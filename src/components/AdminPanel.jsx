import { useState, useEffect, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const { darkMode } = useContext(ThemeContext);

  const [userStats, setUserStats] = useState({
    totalMale: 0,
    totalFemale: 0,
    totalOther: 0,
    totalAdmins: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchUsers = () => {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const uniqueUsers = storedUsers.filter(
        (user, index, self) =>
          index === self.findIndex((u) => u.email === user.email)
      );
      setUsers(uniqueUsers);

      const stats = {
        totalMale: uniqueUsers.filter((user) => user.gender === "Male").length,
        totalFemale: uniqueUsers.filter((user) => user.gender === "Female").length,
        totalOther: uniqueUsers.filter((user) => user.gender === "Other").length,
        totalAdmins: uniqueUsers.filter((user) => user.role === "admin").length,
        totalUsers: uniqueUsers.filter((user) => user.role === "user").length,
      };

      setUserStats(stats);
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (email) => {
    const userToDelete = users.find((user) => user.email === email);

    if (userToDelete.role === "admin") {
      alert("Admin account cannot be deleted!");
      return;
    }

    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("User deleted successfully!");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-8 px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <h1
        className={`text-3xl font-semibold mb-6 ${
          darkMode ? "text-white" : "text-blue-600"
        }`}
      >
        Admin Panel HexaLab
      </h1>

      {/* Statistik Pengguna */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mb-6">
        {/* Total Users */}
        <div
          className={`flex items-center justify-between p-4 border-2 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800 text-gray-200 border-gray-700" : "bg-white text-gray-800 border-gray-300"
          }`}
        >
          <div>
            <p className="text-lg font-semibold">Total Users</p>
            <p className="text-3xl font-bold text-blue-500">{users.length}</p>
          </div>
          <span className="material-icons text-blue-500 text-5xl">group</span>
        </div>

        {/* Gender Stats */}
        <div
          className={`p-4 border-2 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800 text-gray-200 border-gray-700" : "bg-white text-gray-800 border-gray-300"
          }`}
        >
          <p className="text-lg font-semibold">Gender Statistics</p>
          <div className="mt-4">
            <p className="flex items-center">
              <span className="material-icons text-blue-500 mr-2">male</span>
              Male: <span className="ml-auto font-bold">{userStats.totalMale}</span>
            </p>
            <p className="flex items-center mt-2">
              <span className="material-icons text-pink-500 mr-2">female</span>
              Female: <span className="ml-auto font-bold">{userStats.totalFemale}</span>
            </p>
            <p className="flex items-center mt-2">
              <span className="material-icons text-yellow-500 mr-2">person</span>
              Other: <span className="ml-auto font-bold">{userStats.totalOther}</span>
            </p>
          </div>
        </div>

        {/* Role Stats */}
        <div
          className={`p-4 border-2 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800 text-gray-200 border-gray-700" : "bg-white text-gray-800 border-gray-300"
          }`}
        >
          <p className="text-lg font-semibold">Role Statistics</p>
          <div className="mt-4">
            <p className="flex items-center">
              <span className="material-icons text-green-500 mr-2">admin_panel_settings</span>
              Admins: <span className="ml-auto font-bold">{userStats.totalAdmins}</span>
            </p>
            <p className="flex items-center mt-2">
              <span className="material-icons text-blue-500 mr-2">person</span>
              Users: <span className="ml-auto font-bold">{userStats.totalUsers}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabel Pengguna */}
      <div
        className={`w-full max-w-6xl shadow-lg rounded-lg p-6 ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
        } overflow-x-auto`}
      >
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr
              className={`${
                darkMode
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              } transition-all`}
            >
              <th className="p-4 text-left">
                <div className="flex items-center">
                  <span className="material-icons text-white-500 mr-2">person</span>
                  Username
                </div>
              </th>
              <th className="p-4 text-left">
                <div className="flex items-center">
                  <span className="material-icons text-white-500 mr-2">email</span>
                  Email
                </div>
              </th>
              <th className="p-4 text-left">
                <div className="flex items-center">
                  <span className="material-icons text-white-500 mr-2">wc</span>
                  Gender
                </div>
              </th>
              <th className="p-4 text-left">
                <div className="flex items-center">
                  <span className="material-icons text-white-500 mr-2">supervised_user_circle</span>
                  Role
                </div>
              </th>
              <th className="p-4 text-left">
                <div className="flex items-center">
                  <span className="material-icons text-white-500 mr-2">schedule</span>
                  Last Login
                </div>
              </th>
              <th className="p-4 text-left">
                <div className="flex items-center">
                  <span className="material-icons text-white-500 mr-2">event</span>
                  Created At
                </div>
              </th>
              <th className="p-4 text-center">
                <div className="flex items-center justify-center">
                  <span className="material-icons text-red-500">delete</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`border-b transition-all ${
                  darkMode
                    ? "border-gray-700 hover:bg-gray-800 hover:shadow-lg"
                    : "border-gray-300 hover:bg-gray-100 hover:shadow-lg"
                }`}
              >
                <td className="p-4 flex items-center">
                  <span className="material-icons text-blue-500 mr-2">person</span>
                  {user.username || "N/A"}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.gender || "N/A"}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.lastLogin || "N/A"}</td>
                <td className="p-4">{user.createdAt || "Unknown"}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(user.email)}
                    className={`px-3 py-1 flex items-center justify-center border-2 rounded ${
                      darkMode
                        ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                        : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <span className="material-icons">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
