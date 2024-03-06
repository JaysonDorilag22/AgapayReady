import React from "react";
import Verification from "../../assets/Verification.png";
export default function EmailConfirmation() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
  <div className="max-w-xl px-5 text-center">
  <img src={Verification}/>
    <h2 className="mb-2 text-[42px] font-bold text-zinc-800">Check your email for verification</h2>
    <p className="mb-2 text-lg text-zinc-500">We’ve sent you a verification link to the email address</p>
  </div>
</div>
  );
}
