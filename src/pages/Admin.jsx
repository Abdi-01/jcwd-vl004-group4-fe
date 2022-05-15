import React from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import HomeAdmin from "./admin/home/HomeAdmin";

const Admin = () => {
  if (localStorage.getItem("token_shutter_admin")) {
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
