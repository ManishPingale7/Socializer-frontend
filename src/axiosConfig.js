import axios from "axios";

axios.defaults.baseURL = "https://socializer-backend-rh1z.onrender.com/api/";

const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

if (username && password) {
  axios.defaults.headers["Authorization"] = `Basic ${btoa(
    `${username}:${password}`
  )}`;
}

export default axios;
