import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { AuthData } from "../types";

const cookies = new Cookies();

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authData: AuthData = cookies.get("auth_data");

    const isAuthenticated = !!authData;
    const userType = isAuthenticated ? authData.type : "unauthenticated";

    setIsAuthenticated(isAuthenticated);
    setIsAdmin(userType == "admin");
  }, []);

  const setAuthData = (authData: AuthData) => {
    cookies.set("auth_data", authData);
  };

  const clearAuthData = () => {
    cookies.remove("auth_data");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isAdmin, setAuthData, clearAuthData };
};

export default useAuth;
