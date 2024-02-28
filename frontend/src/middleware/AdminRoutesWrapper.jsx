import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AdminRoutesWrapper = ({ element }) => {
  const userRole = useSelector((state) => state.user.currentUser?.role);

  useEffect(() => {
    if (userRole !== "Admin") {
      window.location.href = "/";
    }
  }, [userRole]);

  return <>{element}</>;
};

export default AdminRoutesWrapper;
