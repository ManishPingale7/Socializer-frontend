/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useParams, Link } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Leaflet library for map and markers

const Profile = () => {
  const { id } = useParams();
  console.log(id);
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        // id is present->show given id's profile
        try {
          setLoading(true);
          const respones = await axios.get("profiles/" + id, {});
          setLoading(false);
          setUserData(respones.data);
          console.log(respones.data);
        } catch (err) {
          setError("Error occured while fetching profile with id:", id);
          setLoading(false);
          console.log(err);
        }
      } else {
        // id is not present->show user's profile
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");

        if (username && password) {
          try {
            const response = await axios.get("profiles/" + username, {});

            setUserData(response.data); // Store the fetched user data
            setLoading(false); // Set loading to false after data is fetched
          } catch (error) {
            setError("Failed to load user profile data.", error);
            setLoading(false);
          }
        } else {
          setError("User not logged in.");
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  if (error)
    return (
      <>
        <section className="bg-white min-h-screen dark:bg-gray-900">
          <div className="py-6 px-4 mx-auto max-w-screen-xl lg:py-12 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                404
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Something went wrong.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, please try later, we will work on this.
                <br />
                <h3>{error}</h3>
              </p>

              <Link
                to="/"
                className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
              >
                {" "}
                Back to Homepage
              </Link>
            </div>
          </div>
        </section>
      </>
    );

  // show loading
  if (loading)
    return (
      <>
        <section className="py-6 bg-white min-h-screen   md:py-12 dark:bg-gray-900 antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div
              role="status"
              className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
            >
              <div className="flex items-center justify-center w-full h-64 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg
                  className="w-20 h-20 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div className="w-full ">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </section>
      </>
    );

  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [40, 40],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    },
  });

  const customIcon = new LeafIcon({
    iconUrl:
      "https://static-00.iconduck.com/assets.00/map-marker-icon-171x256-xkl73sge.png",
    shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  });
  return (
    <>
      <section className="py-6 bg-white    md:py-12 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="flex flex-col bg-dark shadow-sm border border-dark-200 rounded-lg my-2 w-96">
              <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
                <img
                  className="w-full h-full object-cover"
                  src={userData.photo}
                  alt="profile-picture"
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="mb-1 text-xl font-semibold text-slate-200">
                  {userData.name}
                </h4>
                <p className="text-sm font-semibold text-slate-400 uppercase">
                  Contact:
                  <br />
                  {userData.contact_info}
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Name: {userData.name}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  Address: {userData.address}
                </p>
              </div>

              <hr className="my-6 md:my-8 border-gray-300 dark:border-gray-700" />
              <p className="mb-6 text-gray-500 text-xl dark:text-gray-400">
                Description: {userData.description}
              </p>

              <p className="mb-6 text-gray-500 text-xl dark:text-gray-400">
                Interests: {userData.interests}
              </p>
              <p className="mb-6 text-gray-500 text-xl dark:text-gray-400">
                Coordinates: ({userData.latitude} , {userData.longitude} )
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex dark:bg-gray-900">
        <h1 className="pb-2 mx-auto  text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
          Map summary
        </h1>
      </div>

      <div className="">
        <div className=" px-3 flex  dark:bg-gray-900 justify-center items-center">
          <MapContainer
            center={[userData.latitude, userData.longitude]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "600px" }} // Map style for dimensions
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap tile layer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker
              position={[userData.latitude, userData.longitude]}
              icon={customIcon}
            >
              <Popup>
                {userData.name}s Coordinates: <br />
                {userData.latitude}, {userData.longitude}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Profile;
