import React, { useState } from "react";
import { useFetchData } from "../../../hooks/useFetch";
import edit from '../../../assets/edit.svg';
import { PersonalDetailsModal } from "../../../components/user/PersonalDetailsModal";
import { EmailPasswordModal } from "../../../components/user/EmailPasswordModal";

export const AccountSettings = () => {
  const [userProfile, loading, error, refetch] = useFetchData("/user/profile");
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
  

  const handlePersonalDetailsSuccess = () => {
    refetch(); 
  };
  const togglePersonalModal = () => setIsPersonalModalOpen(!isPersonalModalOpen);
  const toggleCredentialsModal = () => setIsCredentialsModalOpen(!isCredentialsModalOpen);

  const phoneNumber = userProfile.addresses && userProfile.addresses.length > 0 
    ? userProfile.addresses[0].phoneNumber 
    : "Not provided";

  return (
    <div className="p-4 md:p-8 mt-10">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Account Settings</h1>
      <div className="bg-white rounded shadow-md mb-6 p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold">Personal Details</h2>
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p><strong>Name: </strong>{userProfile.name}</p>
              <p>
                <strong>Date Of Birth: </strong>
                {userProfile.dob ? new Date(userProfile.dob).toISOString().slice(0, 10) : "Not provided"}
              </p>
              <p><strong>Phone: </strong>+91{phoneNumber}</p>
            </div>
            <button onClick={togglePersonalModal}>
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
            <p><strong>Password: </strong>********</p>
          </div>
          <button onClick={toggleCredentialsModal}>
            <img src={edit} alt="edit" className="text-black w-6 h-6" />
          </button>
        </div>
      </div>

      {isPersonalModalOpen && (
        <PersonalDetailsModal
          userProfile={userProfile}
          onClose={togglePersonalModal}
          onSuccess={handlePersonalDetailsSuccess}
        />
      )}
      {isCredentialsModalOpen && (
        <EmailPasswordModal
          userProfile={userProfile}
          onClose={toggleCredentialsModal}
        />
      )}
    </div>
  );
};
