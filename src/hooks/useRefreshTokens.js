import axios from "../api/axios";
import useAuth from "./useAuth";
const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    setAuth({ email, token, role });

    const response = await axios.get("/refresh", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data["status"] === "success") {
      const newToken = response.data["token"];
      setAuth({ email: email, token: newToken, role: role });
      localStorage.setItem("token", response.data["token"]);
      return response.data["token"];
    } else {
      return;
    }
  };
  return refresh;
};

export default useRefreshToken;
