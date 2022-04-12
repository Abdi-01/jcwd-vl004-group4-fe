import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styled from "@emotion/styled";
import { API_URL } from "../constants/API";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url("https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80")
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Verification = () => {
  const [isVerified, setIsVerified] = useState({
    message: "Loading...",
    verified: false,
  });
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    // console.log(token);
    Axios.patch(
      `${API_URL}/users/verified`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        setIsVerified({
          message: `Verification success, will redirect shortly`,
          verified: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const alreadyVerified = () => {
    if (isVerified.verified) {
      let timerInterval;
      Swal.fire({
        icon: "success",
        title: isVerified.message,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        setTimeout(() => navigate("/login", 10000));
      });
    }
  };

  return <Container>{alreadyVerified()}</Container>;
};

export default Verification;
