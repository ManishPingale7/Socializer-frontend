/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Profile from "./Profile";
import axios from "axios";

const ProfileGrid = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/profiles/",
          { auth: { username: "admin", password: "admin" } }
        );
        setProfiles(response.data);
      } catch (err) {
        setError("Failed to fetch profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <p>Loading profiles....</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      {/* Grid */}
      <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* call multiple cards */}
        {profiles.map((profile) => (
          <Profile key={profile.id} />
        ))}
      </div>
    </>
  );
};

export default ProfileGrid;
