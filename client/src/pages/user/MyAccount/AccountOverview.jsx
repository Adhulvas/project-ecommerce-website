import React from 'react';
import { useFetchData } from '../../../hooks/useFetch';

export const AccountOverview = () => {
  const [userProfile] = useFetchData("/user/profile");

  return (
    <div className="w-full p-4 md:p-8 mt-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Hello, {userProfile.name}</h1>
      <p className="text-gray-500 mb-8">Account Overview</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-200 h-36 md:h-48 rounded-lg flex items-center justify-center">
          <button className="bg-black text-white px-4 py-2 rounded">Download the App</button>
        </div>
        <div className="bg-black h-36 md:h-48 rounded-lg flex items-center justify-center">
          <button className="text-white text-lg">FAQ</button>
        </div>
      </div>
    </div>
  );
};

