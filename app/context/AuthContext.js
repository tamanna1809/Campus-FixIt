import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        login: (token) => setUserToken(token),
        logout: () => setUserToken(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
