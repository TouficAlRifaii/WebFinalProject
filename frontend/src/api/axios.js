import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api",
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:8000/api",
  
});