import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import styled from "@emotion/styled";
import { TextField, Button } from "@material-ui/core";
import Swal from "sweetalert2";

import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/API";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url("https://images.unsplash.com/photo-1586015555751-63bb77f4322a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80")
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

const AdminForgetPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email required")
        .email("Invalid Email Address"),
    }),
    onSubmit: (values) => {
      //   console.log(values);
      Axios.post(`${API_URL}/admin/forgot-password`, values)
        .then((res) => {
          Swal.fire({ title: res.data.message, icon: "info" });
          navigate("/");
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            icon: "error",
          });
        });
    },
  });
  return (
    <Container>
      <Wrapper>
        <Title>Enter your admin email address</Title>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Email"
          className="mb-3"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          variant="contained"
          className="mb-3"
          onClick={formik.handleSubmit}
        >
          Submit
        </Button>
      </Wrapper>
    </Container>
  );
};

export default AdminForgetPassword;
