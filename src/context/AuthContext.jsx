import React, { createContext, useState, useEffect } from "react";

// Buat konteks
const AuthContext = createContext();

// Akun admin default
const adminAccount = {
  email: "hexalab@admin.com",
  password: "hexalab415",
  role: "admin",
  username: "HexaLab",
  gender: "Other",
  createdAt: new Date().toLocaleString(),
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  // Tambahkan admin ke localStorage jika belum ada
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isAdminExists = users.some((user) => user.email === adminAccount.email);

    if (!isAdminExists) {
      users.push(adminAccount);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const accountIndex = users.findIndex((user) => user.email === email && user.password === password);

    if (accountIndex !== -1) {
      const account = users[accountIndex];
      const loggedInUser = {
        ...account,
        lastLogin: new Date().toLocaleString(),
      };

      // Update `lastLogin` di localStorage
      users[accountIndex] = loggedInUser;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
