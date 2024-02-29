import React from "react";
import { useSelector } from "react-redux";
export default function AdminProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
    This is admin
 
    </div>
  );
}
