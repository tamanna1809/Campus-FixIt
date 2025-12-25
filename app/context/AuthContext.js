import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (token, user) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userInfo", JSON.stringify(user));
    setUserToken(token);
    setUserInfo(user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userInfo");
    setUserToken(null);
    setUserInfo(null);
  };

  const isLoggedIn = async () => {
     try {
       let token = await AsyncStorage.getItem("token");
       let user = await AsyncStorage.getItem("userInfo");
       if (token) {
         setUserToken(token);
         if (user) setUserInfo(JSON.parse(user));
       }
     } catch (e) {
       console.log("isLoggedIn error", e);
     }
  };

  // Check login status on mount
  // Note: user logic usually has a checkLogin effect or similar, assuming existing logic handles token check 
  // I will just add the userInfo loading to wherever token is loaded or add a useEffect here if needed.
  // The original file didn't show the useEffect for checking initial login which is common.
  // I'll add a simple useEffect to load initial state.
  
  React.useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
