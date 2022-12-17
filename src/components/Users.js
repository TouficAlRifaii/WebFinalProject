import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/table.css";
import {
  faPenToSquare,
  faTrash,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USERS_URL = "/getUsers";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [blocking, setBlocking] = useState(false);
  const handleBlock = async (user_id) => {
    const data = new FormData();
    data.append("id", user_id);
    try {
      console.log(user_id);
      const response = await axiosPrivate.post("/blockUser", data);
      setBlocking(!blocking);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleUnblock = async (user_id) => {
    const data = new FormData();
    data.append("id", user_id);
    try {
      console.log(user_id);
      const response = await axiosPrivate.post("/unblockUser", data);
      setBlocking(!blocking);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };
  //   getUsers();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
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
  }, [blocking]);

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
                      {user.isBlocked ? (
                        <button onClick={() => handleUnblock(user.id)}>
                          <FontAwesomeIcon icon={faUnlock} />
                        </button>
                      ) : (
                        <button onClick={() => handleBlock(user.id)}>
                          <FontAwesomeIcon icon={faLock} />
                        </button>
                      )}
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
