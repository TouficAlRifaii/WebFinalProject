import axios from "../api/axios";
import useAuth from "./useAuth";
const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    console.log(token);
    setAuth({ email, token, role });
    console.log(auth);
    // console.log("auth token: " + auth.token);
    const response = await axios.get("/refresh", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data["status"] === "success") {
      console.log("success");
      const newToken = response.data["token"];
      setAuth({ email: email, token: newToken, role: role });
      console.log(auth);
      localStorage.setItem("token", response.data["token"]);
      return response.data["token"];
    } else {
      console.log(response.data);
      return;
    }
  };
  return refresh;
};

export default useRefreshToken;
