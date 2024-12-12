import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";
import endPoints from "../../api/endPoints";

const ProfileData = ({ userData, handleLogout, closeProfile }) => {
  const [profile, setProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [error, setError] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(
          endPoints.PROFILE.GET_PROFILE(userData.userID)
        );
        setProfile(response.data.account);
        setUpdatedProfile({
          username: response.data.account.userID.username || "",
          email: response.data.account.userID.email || "",
          mobilenumber: response.data.account.userID.mobilenumber || "",
        });
      } catch (err) {
        setError("Failed to fetch profile data. Please try again later.");
      }
    };

    fetchProfile();
  }, [userData.userID]);



  const handleLogoutClick = () => {
    localStorage.removeItem('loggedInUser');
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] h-auto flex flex-col md:flex-row p-5 relative">
        <FaTimes
          className="absolute top-4 right-4 text-pink-400 cursor-pointer hover:text-pink-500"
          onClick={closeProfile}
          size={24}
        />

        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-orange-500 to-pink-400 p-5 rounded-lg md:w-1/2">
          <img
            src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-user-icon-isolated-on-abstract-background-png-image_5192004.jpg"
            alt="Profile"
            className="rounded-full w-24 h-24 mb-4"
          />
          <h2 className="text-white font-bold text-xl">
            Hello, {userData.admin ? "Admin" : profile.userID.username}
          </h2>
          <p className="text-white font-semibold text-small mt-4">
            {userData.admin ? "Take Your Charge" : "Thanks for choosing us!"}
          </p>
        </div>

        <div className="flex flex-col p-4 md:w-2/3">
          <h3 className="font-bold text-lg mb-2 text-center text-pink-500">
            Personal Information
          </h3>

            <>
              <div className="flex justify-between text-sm mt-8 mb-6 text-pink-500">
                <p>Username:</p>
                <p className="font-semibold text-pink-500">
                  {profile.userID.username}
                </p>
              </div>
              <div className="flex justify-between text-sm mb-6 text-pink-500">
                <p>Email:</p>
                <p className="font-semibold">{profile.userID.email}</p>
              </div>
              <div className="flex justify-between text-sm mb-6 text-pink-500">
                <p>Phone:</p>
                <p className="font-semibold">{profile.userID.mobilenumber}</p>
              </div>
            </>

          <button
            onClick={handleLogoutClick}
            className="mt-6 font-bold bg-pink-400 text-white py-2 px-4 rounded hover:bg-pink-500 w-full"
          >
            Logout
          </button>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-pink-400 text-center">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleCancelLogout}
                className="bg-green-300 text-gray-700 py-2 px-4 rounded hover:bg-green-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileData;
