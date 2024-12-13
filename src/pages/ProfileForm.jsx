/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate, Link, useParams } from "react-router-dom";
import getLatLong from "../geocode";

const ProfileForm = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [interest, setInterest] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (id) {
        try {
          const response = await axios.get(`profiles/${id}/`, {});
          if (response) {
            setName(response.data.name);
            setPhoto(response.data.photo);
            setAddress(response.data.address);
            setUsername(response.data.username);
            setContact(response.data.contact_info);
            setInterest(response.data.interests);
            setDescription(response.data.description);
          } else {
            console.log("no dat");
          }
        } catch (err) {
          console.log("catched ", err);
        }
      }
    };

    fetchProfileData();
  }, []);

  async function makePutRequest(userData) {
    const responsePut = await axios.put(`/profiles/${id}/`, userData);
    try {
      if (responsePut) {
        console.log("Updated profile successfully");
      } else {
        console.log("Can't update ");
        setError("Can't update error");
      }
    } catch (err) {
      console.log("Catch makePutRequest", err);
      setError("Catch makePutRequest", err);
    }
  }

  async function makePostRequest(userData) {
    try {
      const responsePost = await axios.post("profiles/", userData, {
        auth: { username: email, password: password },
      });
      if (responsePost) {
        localStorage.setItem("id", responsePost.data.id);
        console.log("Created profile successfully");
      } else {
        setError("Erro occured");
        console.log("Erro occured", responsePost);
      }
    } catch (err) {
      setError("Catch makePostRequest", err);
      console.log("Catch makePostRequest", err);
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("contact_info", contact);
    formData.append("interests", interest);
    formData.append("photo", photo);

    try {
      const res = await getLatLong(address); // Wait & retrieve lat,long

      if (res) {
        console.log("Latitude:", res.latitude);
        console.log("Longitude:", res.longitude);

        formData.append("latitude", res.latitude);
        formData.append("longitude", res.longitude);

        //updating profile of user
        await makePutRequest(formData);
        setLoading(false);
        navigate(`/profiles/${id}/`);
      } else {
        console.log("Location not found");
      }
    } catch (err) {
      console.log("catch", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const creds = {
      email: email,
      password: password,
      username: email,
    };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", email);
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

      try {
        const res = await getLatLong(address); // Wait & retrieve lat,long

        if (res) {
          console.log("Latitude:", res.latitude);
          console.log("Longitude:", res.longitude);

          formData.append("latitude", res.latitude);
          formData.append("longitude", res.longitude);

          //creating profile of user
          await makePostRequest(formData);
          setLoading(false);
          navigate("/");
        } else {
          console.log("Location not found");
          setError("Location not found");
        }
      } catch (err) {
        console.error("Error in fetcing coordinates: ", err);
        setError("Error in fetcing coordinates.. ", err);
      }
    } catch (err) {
      setError("Error occured during registeration", err);
      console.log("Error occured during registeration...", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-white min-h-screen dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          {error ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Error occured </span> Change a few
                things up and try submitting again.
              </div>
            </div>
          ) : (
            ""
          )}
          <h2 className="mb-4  text-center text-xl font-bold text-gray-900 dark:text-white">
            {id == undefined ? "Register on Socializer!" : "Edit Profile"}
          </h2>
          <form onSubmit={id == undefined ? handleRegister : handleEdit}>
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
              {id == undefined ? (
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
              ) : (
                ""
              )}

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
                  placeholder="Your city/area "
                  required
                />
              </div>

              {id == undefined ? (
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
              ) : (
                ""
              )}

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

            {id == undefined ? (
              <Link
                to="/login"
                className="text-sm font-light text-gray-500 dark:text-gray-400 font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Have an account?
              </Link>
            ) : (
              ""
            )}

            <div className="flex flex-col items-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                {loading ? (
                  <div className="animate-spin border-4 border-t-4 border-white rounded-full w-6 h-6 mx-auto" />
                ) : id == undefined ? (
                  "Register !"
                ) : (
                  "Confirm edit"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ProfileForm;
