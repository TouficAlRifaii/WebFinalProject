import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useLogout from "../hooks/useLogout";

const AuthVerify = () => {
  const logout = useLogout();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    // navigate("/login");
  };

  useEffect(() => {
    const expiryDate = localStorage.getItem("expiryDate");

    if (expiryDate) {
      if (expiryDate < Date.now()) {
        handleLogout();
      }
    }
  }, [location]);

  return;
};

export default AuthVerify;
