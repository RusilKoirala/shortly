import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-geist">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Not logged in</h1>
          <p className="text-gray-400">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-geist">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fadein text-center">
        <h2 className="text-3xl font-bold mb-4 font-satoshi">{user.name}</h2>
        <div className="text-gray-300 font-inter mb-2">{user.email}</div>
        {user.createdAt && (
          <div className="text-gray-500 font-inter text-sm mb-2">Joined: {new Date(user.createdAt).toLocaleDateString()}</div>
        )}
        <div className="text-gray-400 font-inter text-sm">Welcome to your Shortly profile.</div>
      </div>
    </div>
  );
};

export default Profile; 