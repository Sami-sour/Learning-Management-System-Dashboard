import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL ||  "http://localhost:5000"});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem("lms_user");
  console.log(user)
  if (user) {
    const parsedUser = JSON.parse(user);

    if (parsedUser?.token) {
      req.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
  }
  return req;
});

export default API;
