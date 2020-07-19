import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState(undefined);

  useEffect(() => {
    //use the server call for checking auth and permissions here
    setTimeout(() => {
      setIsAuthenticated(true);
      setPermissions([{ role: "admin" }]);
    }, 2000);
  }, []);

  return { isAuthenticated, permissions };
};

export default useAuth;
