import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const USERS_URL = "/getUsers";

const Users = () => {
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  const { auth } = useAuth();
  const token = auth.token;
  const authHeader = "Bearer " + token;

  //   getUsers();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: authHeader,
          },
        };
        const response = await axiosPrivate.get(USERS_URL);
        if (response.data["status"] === "success") {
          isMounted && setUsers(response.data.users);
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
        //navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section>
      <h1>Users List</h1>
      {users?.length ? (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Permission</th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user?.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "Normal User"}</td>
                <td>{user.isBlocked ? "Blocked" : "Allowed"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users Registered</p>
      )}
      
    </section>
  );
};

export default Users;
