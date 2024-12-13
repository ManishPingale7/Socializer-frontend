/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLogged }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      setLoading(true);
      const response = await axios.post("login/", { username, password });

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      console.log("Login successful:", response.data);
      setIsLogged(true);
      //redirect to home
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://www.freeiconspng.com/thumbs/network-icon/communication-community-connection-global-internet-network-icon--14.png\public\logo.svg"
            alt="logo"
          />
          Socializer
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin border-4 border-t-4 border-white rounded-full w-6 h-6 mx-auto" />
                ) : (
                  "Sign in"
                )}
              </button>

              <Link
                to="/register"
                className="text-sm font-light text-gray-500 dark:text-gray-400 font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Don’t have an account yet?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
