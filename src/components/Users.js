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
    <>
      <section className="users-flex">
        <h1>Users List</h1>
      </section>
      {users?.length ? (
        <div class="table-container">
          <ul class="responsive-table">
            <li class="table-header">
              <div class="col col-1">Name</div>
              <div class="col col-2">Email</div>
              <div class="col col-1">Type</div>
              <div class="col col-1">Access</div>
              <div class="col col-1">Actions</div>
            </li>
            {users?.map((user) => (
              <li key={user.id} class="table-row">
                <div class="col col-1" data-label="Name">
                  {user.name}
                </div>
                <div class="col col-2" data-label="Email">
                  {user.email}
                </div>
                <div class="col col-1" data-label="Type">
                  {user.isAdmin ? "Admin" : "User"}
                </div>
                <div class="col col-1" data-label="Access">
                  {user.isBlocked ? "Blocked" : "Allowed"}
                </div>
                <div class="col col-1" data-label="Actions">
                  {user.isBlocked ? (
                    <button onClick={() => handleUnblock(user.id)}>
                      <FontAwesomeIcon icon={faUnlock} />
                    </button>
                  ) : (
                    <button onClick={() => handleBlock(user.id)}>
                      <FontAwesomeIcon icon={faLock} />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No users Registered</p>
      )}
    </>
  );
};

export default Users;
