import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    // const isAuthenticated = !!cookies.get("token"); If the token is present in cookies user is authenticated
    //const userType = cookies.get("user_type")

    setIsAuthenticated(false);
    setUserType("admin");
  }, []);

  return { isAuthenticated, userType };
};

export default useAuth;
