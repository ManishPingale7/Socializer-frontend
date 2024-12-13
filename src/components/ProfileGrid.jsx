/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import CardSkeleton from "./CardSkeleton";
import { useSearch } from "../searchContext";

const ProfileGrid = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get("profiles/", {
          params: { query: searchQuery },
        });
        setProfiles(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [searchQuery]);

  if (loading) {
    const skeletons = Array(4).fill(0); // Or dynamic number based on data
    return (
      <>
        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skeletons.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  if (error)
    return (
      <>
        <section className="bg-white  dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                404
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Something went wrong.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, its not you its us.{" "}
              </p>
              <a
                href="#"
                className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
              >
                Back to Homepage
              </a>
            </div>
          </div>
        </section>
      </>
    );

  return (
    <>
      {/* Grid */}
      <div className="grid gap-8  lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            id={profile.id}
            img={profile.photo}
            name={profile.name}
            description={profile.description}
          />
        ))}
      </div>
    </>
  );
};

export default ProfileGrid;
