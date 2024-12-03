import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFetchData } from "../../hooks/useFetch";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [userProfile, loading, error] = useFetchData("/user/profile");

  if (loading) return <p>Loading profile...</p>;
  if (error) {
    toast.error(error.response?.data?.message || "Failed to fetch user profile");
    navigate("/");
    return <p className="text-red-500">Error fetching profile data.</p>;
  }

  return (
    <div className="max-w-5xl p-8 mt-28 mb-12 mx-auto bg-gray-200 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {userProfile ? (
        <div>
          <h2 className="text-xl font-semibold">{userProfile.name}</h2>
          <p>Email: {userProfile.email}</p>
          <p>Joined: {new Date(userProfile.createdAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
}

