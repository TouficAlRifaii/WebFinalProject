import useAuth from "./useAuth";
// import useAxiosPrivate from "./useAxiosPrivate";
import axios from "../api/axios";

const useLogout = () => {
  const { setAuth } = useAuth();
  // const axios = useAxiosPrivate();

  const logout = async () => {
    setAuth({});
    try {
      const token = localStorage.getItem("token");
      localStorage.clear();
      const response = await axios.post("/logout", {
        headers: {
          Authentication: `Bearer ${token}`
        }
      });
      if (response.data["status"] === "success") {
        
      }
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
