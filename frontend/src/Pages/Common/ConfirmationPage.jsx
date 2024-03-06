import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Verification from "../../assets/Verification.png";
import logo from "../../assets/services/vite.png"

const ConfirmationPage = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.put(`/api/v1/confirm/${userId}/${token}`);
        console.log("Email confirmed:", response.data);
      } catch (error) {
        console.error("Email confirmation failed:", error);
        navigate("/error");
      }
    };

    confirmEmail();
  }, [userId, token, navigate]);

  return (
    <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
  <div class="max-w-xl px-5 text-center">
  <img src={Verification}/>
    <h2 class="mb-2 text-[42px] font-bold text-zinc-800">Welcome to AgapayReady</h2>
    <p class="mb-2 text-lg text-zinc-500">your trusted companion in times of emergency. Your safety is our priority, and we're here to provide swift assistance when you need it most.</p>
    <Link to="/login" class="mt-3 inline-block w-96 rounded bg-red-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-red-700">Go to log in</Link>
  </div>
</div>
  );
};

export default ConfirmationPage;
