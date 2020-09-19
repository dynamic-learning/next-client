import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { AuthData } from "../types";

const cookies = new Cookies();

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const authData: AuthData = cookies.get("auth_data");

    const isAuthenticated = !!authData;
    const userType = isAuthenticated ? authData.type : "unauthenticated";

    setIsAuthenticated(isAuthenticated);
    setUserType(userType);
  }, []);

  const setAuthData = (authData: AuthData) => {
    cookies.set("auth_data", authData);
  };

  const clearAuthData = () => {
    cookies.remove("auth_data");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, userType, setAuthData, clearAuthData };
};

export default useAuth;
