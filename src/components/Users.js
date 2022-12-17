import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/table.css";

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
    <section className="users-flex">
      <h1>Users List</h1>
      {users?.length ? (
        <div className="flexDiv">
          <div className="table">
            <table className="table__content">
              <thead className="table__head">
                <tr>
                  <th className="table__heading-cell">Name</th>
                  <th className="table__heading-cell">Email</th>
                  <th className="table__heading-cell">Role</th>
                  <th className="table__heading-cell">Permission</th>
                  <th className="table__heading-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="table__body">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="table__data-cell">{user?.name}</td>
                    <td className="table__data-cell">{user.email}</td>
                    <td className="table__data-cell">
                      {user.isAdmin ? "Admin" : "Normal User"}
                    </td>
                    <td className="table__data-cell">
                      {user.isBlocked ? "Blocked" : "Allowed"}
                    </td>
                    <td className="table__data-cell">
                      <button>{user.isBlocked ? "UnBlock" : "Block"}</button>
                      {user.isAdmin ? <button>"Make Admin</button> : <></>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No users Registered</p>
      )}
    </section>
  );
};

export default Users;
