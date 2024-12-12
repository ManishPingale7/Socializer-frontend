/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [interest, setInterest] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const creds = {
      email: email,
      password: password,
      username: email,
    };
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("contact_info", contact);
    formData.append("interests", interest);
    formData.append("photo", photo);

    try {
      //creating account first
      const response = await axios.post("register/", creds);
      console.log("Return data", response.data);
      console.log("Created account successfully");

      //save creds
      localStorage.setItem("username", email);
      localStorage.setItem("password", password);
      //creating profile of user

      const response2 = await axios.post("profiles/", formData, {
        auth: { username: email, password: password },
      });
      localStorage.setItem("id", response2.data.id);
      console.log("Created profile successfully");

      setLoading(false);
      navigate("/");
    } catch (err) {
      setError("Error occured while fetchinf", err);
      console.log("Error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-white min-h-screen dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4  text-center text-xl font-bold text-gray-900 dark:text-white">
            Register on Socializer!
          </h2>
          <form onSubmit={handleRegister}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Name */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter name"
                  required
                />
              </div>

              {/* photo */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="photo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Photo
                </label>
                <input
                  type="text"
                  name="photo"
                  id="photo"
                  value={photo}
                  onChange={(e) => {
                    setPhoto(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your photo URL"
                  required
                />
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Address  */}
              <div className="w-full">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your address "
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter password"
                  required
                />
              </div>

              {/* contact number */}
              <div className="w-full">
                <label
                  htmlFor="contact"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact number
                </label>
                <input
                  type="phone"
                  name="contact"
                  id="contact"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your contact "
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="interest"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Interest
                </label>
                <input
                  type="text"
                  name="interest"
                  value={interest}
                  onChange={(e) => {
                    setInterest(e.target.value);
                  }}
                  id="interest"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter comma seprated interest"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={8}
                  value={description}
                  required
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                />
              </div>
            </div>

            <Link
              to="/login"
              className="text-sm font-light text-gray-500 dark:text-gray-400 font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Have an account?
            </Link>

            <div className="flex flex-col items-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                {loading ? (
                  <div className="animate-spin border-4 border-t-4 border-white rounded-full w-6 h-6 mx-auto" />
                ) : (
                  "Register !"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
