import React, { useState } from "react";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import "./registerAdmin.scss";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_URL } from "../../../constants/API";
import Axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const RegisterAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  let admin = useSelector((state) => state.authAdminLogin);

  console.log(admin);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email required"),
      username: Yup.string()
        .max(15, "Must be 15 character or less")
        .required("Username required"),
      password: Yup.string()
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
          "Password must contain at least eight characters, at least one number and both lower and uppercase letters, and special characters"
        )
        .required("Password required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      Axios.post(`${API_URL}/admin/register`, values)
        .then((res) => {
          setLoading(false);
          Swal.fire({
            text: res.data.message,
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  if (admin.is_super_admin) {
    return (
      <div className="register">
        <Sidebar />
        <div className="homeContainer">
          <Wrapper>
            <Title>Register New Admin</Title>
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
              label="Username"
              className="mb-3"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
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
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                className="mb-4"
                onClick={formik.handleSubmit}
              >
                Register
              </Button>
            )}
          </Wrapper>
        </div>
      </div>
    );
  } else {
    return (
      <div className="register">
        <Sidebar />
        <div className="homeContainer">
          <Alert severity="error">
            <AlertTitle>Access Denied</AlertTitle>
            <strong>You don't have access to this page</strong>
          </Alert>
        </div>
      </div>
    );
  }
};

export default RegisterAdmin;
