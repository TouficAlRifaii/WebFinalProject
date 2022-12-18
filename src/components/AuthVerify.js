import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useLogout from "../hooks/useLogout";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  const logout = useLogout();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const expiryDate = localStorage.getItem("expiryDate");

    if (expiryDate) {
      console.log("exp Date" + expiryDate);
      console.log(Date.now());
      if (expiryDate < Date.now()) {
        handleLogout();
      }
    }
  }, [location]);

  return;
};

export default AuthVerify;
