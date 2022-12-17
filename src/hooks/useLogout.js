import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axios = useAxiosPrivate();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.post("/logout");
      if (response.data["status"] === "success") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
