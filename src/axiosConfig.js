import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

if (username && password) {
  axios.defaults.headers["Authorization"] = `Basic ${btoa(
    `${username}:${password}`
  )}`;
}

export default axios;
