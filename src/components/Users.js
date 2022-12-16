import { useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const USERS_URL = "/getUsers";

const Users = async () => {
  const { users, setUsers } = useState([]);

  const { auth } = useAuth();
  const token = auth.token;
  const authHeader = "Bearer " + token;
  const config = {
    headers: {
      Authorization: authHeader,
    },
  };
  try{
    const response = await axios.get(USERS_URL, config);
    if(response.data['status'] === "success"){
        setUsers(response.data.users);
    }
  }catch(error){
    console.log(error.response.data);
  }
  return(
    <section>
        <h1>Users List</h1>
        {users?.length ? (
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Permission</th>
                </tr>
                {users.map((user)=> 
                    <tr>
                        <td>{user?.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? "Admin" : "Normal User" }</td>
                        <td>{user.isBlocked ? "Blocked" : "Allowed"}</td>
                    </tr>
                )}
            </table>
        ) : <p>No users Registered</p>
    }
    </section>
  )
  

};

export default Users;
