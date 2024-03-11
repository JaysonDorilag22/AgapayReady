import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import axios from "axios";
import EditProfileModal from "./EditProfileModal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../../redux/Users/userSlice";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    avatar: null,
    coverPhoto: null
  });

  const dispatch = useDispatch(); // Get dispatch function from Redux

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/api/v1/me");
        setUserDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    setFormData({ ...formData, [name]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      dispatch(updateUserStart()); // Dispatch updateUserStart action

      const response = await axios.post(`/api/v1/update/${userDetails._id}`, formData);

      if (response.data.success) {
        toast.success("User updated successfully!");
        dispatch(updateUserSuccess(response.data)); // Dispatch updateUserSuccess action with response data
        const updatedUserResponse = await axios.get("/api/v1/me");
        setUserDetails(updatedUserResponse.data);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating user.");
      dispatch(updateUserFailure(error)); // Dispatch updateUserFailure action with error
    } finally {
      setIsModalOpen(false); // Close the modal regardless of success or failure
      setUpdating(false);
      window.location.reload()
    }
  };

  return (
    <div className="p-16 flex justify-center bg-slate-300">
      {loading ? (
        <Loader />
      ) : (
        <div className="relative w-full max-w-screen-lg">
          <img className="w-full h-96 object-cover rounded-t-xl" src={userDetails.coverPhoto} alt="Cover Photo" />
          <div className="absolute inset-0 bg-black opacity-50 rounded-t-xl"></div>
          <div className="p-8 bg-white shadow -mt-20 relative">
            <>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                  {/* <div>
                    <p className="font-bold text-gray-700 text-xl">22</p>
                    <p className="text-gray-400">Guidelines</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-700 text-xl">10</p>
                    <p className="text-gray-400">Reports</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-700 text-xl">89</p>
                    <p className="text-gray-400">Contacts</p>
                  </div> */}
                </div>
                <div className="relative">
                  <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full  absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                    <img src={userDetails.avatar} alt="Avatar" className="w-48 h-48 rounded-full" />
                  </div>
                </div>
                <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                 
                  {/* <button className="text-white py-2 px-4 rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                    Send Report
                  </button> */}
                </div>
              </div>
              <div className="mt-20 text-center border-b pb-12">
                <h1 className="text-4xl font-medium text-gray-700">{userDetails.firstname} {userDetails.lastname}</h1>
                <p className="font-light text-gray-600 mt-3">{userDetails.email}</p>
                <p className="font-light text-gray-600 mt-3">{userDetails.phoneNumber}</p>
                <p className="font-light text-gray-600 mt-3">{userDetails.department.name}</p>
                <p className="font-light text-gray-600 mt-3">{userDetails.department.description}</p>


                {/* Other user details */}
                <button className="text-white  px-4 rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5" onClick={() => setIsModalOpen(true)}>
                    Edit Profile
                  </button>
              </div>
            </>
          </div>
        </div>
      )}

      {isModalOpen && (
        <EditProfileModal
          userData={userDetails}
          setIsModalOpen={setIsModalOpen}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />
      )}

      {updating && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
