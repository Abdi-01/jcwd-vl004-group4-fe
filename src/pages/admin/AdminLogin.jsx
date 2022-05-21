import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../../constants/API";
import Axios from "axios";
import { useDispatch } from "react-redux";

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
`;

const Footer = styled.div`
  font-size: 16px;
`;

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email required"),
      password: Yup.string().required("Password Required"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      Axios.post(`${API_URL}/admin/login`, values)
        .then((res) => {
          localStorage.setItem(
            "token_shutter_admin",
            JSON.stringify(res.data.token)
          );
          dispatch({
            type: "ADMIN_LOGIN_SUCCESS",
            payload: res.data.dataLogin,
          });
          // console.log(res.data.dataLogin);
          setIsLogin(true);
          setResMsg(res.data.message);
        })
        .catch((err) => {
          // console.log(err.response.data.message)
          Swal.fire({
            title: err.response.data.message,
            icon: "error",
          });
        });
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const alreadyLogin = () => {
    if (isLogin) {
      let timerInterval;
      Swal.fire({
        icon: "success",
        title: resMsg,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then(() => {
        navigate("/admin/users");
      });
    }
  };

  return (
    <Container>
      {alreadyLogin()}
      <Wrapper>
        <Title>Admin</Title>
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
        <TextField
          fullWidth
          id="outlined-basic"
          label="Password"
          className="mb-3"
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          variant="contained"
          className="mb-4"
          onClick={formik.handleSubmit}
        >
          Sign In
        </Button>
        <Footer>
          <Link to="/admin/forget-password" style={{ textDecoration: "none" }}>
            Forgotten password?
          </Link>
        </Footer>
      </Wrapper>
    </Container>
  );
};

export default AdminLogin;
