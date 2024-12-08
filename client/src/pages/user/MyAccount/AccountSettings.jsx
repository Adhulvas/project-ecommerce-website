import React, { useState } from "react";
import { useFetchData } from "../../../hooks/useFetch";
import edit from '../../../assets/edit.svg';

export const AccountSettings = () => {
  const [userProfile, loading, error] = useFetchData("/user/profile");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-4 md:p-8 mt-10">
      <div className="bg-white rounded shadow-md mb-6 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Account Settings</h1>

        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold">Personal Details</h2>
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p><strong>First Name: </strong>{userProfile.name}</p>
              <p><strong>Phone:</strong></p>
            </div>
            <button onClick={openModal}>
              <img src={edit} alt="edit" className="text-black w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold">Email & Password</h2>
        <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p><strong>Email: </strong>{userProfile.email}</p>
            <p><strong>Password:</strong></p>
          </div>
          <button>
            <img src={edit} alt="edit" className="text-black w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
