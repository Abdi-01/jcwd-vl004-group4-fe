import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import HomeAdmin from "./admin/home/HomeAdmin";

const Admin = () => {
  const admin = useSelector((state) => state.authAdminLogin);

  if (admin.id) {
    return <HomeAdmin />;
  } else {
    return (
      Swal.fire({
        icon: "error",
        timer: 3000,
        text: "You don't have access to this page",
      }),
      (<Navigate to="/" />)
    );
  }
};

export default Admin;
