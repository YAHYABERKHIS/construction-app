import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");

  const [user, setUser] = useState(userInfo);
  const login = (user) => {
    setUser(user);
  };

  const logout = async () => {
    try {
      if (user) {
        const parsedUser = typeof user === "string" ? JSON.parse(user) : user;
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
            Accept: "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout failed on backend:", error);
    }
    setUser(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
