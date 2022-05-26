import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { Card, Row, Modal, Button } from "react-bootstrap";
import History from "../components/history/History";
import { Navigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Link from "@mui/material/Link";
import Axios from "axios";
import { API_URL } from "../constants/API";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background-color: grey;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
`;

const Profile = () => {
  const [user, setUser] = useState({});
  const [userAddress, setUserAddress] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [newUserAddress, setNewUserAddress] = useState([]);

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [showEditName, setShowEditName] = useState(false);
  const handleNameOpen = () => setShowEditName(true);
  const handleNameClose = () => setShowEditName(false);

  const [showEditUsername, setShowEditUsername] = useState(false);
  const handleUsernameOpen = () => setShowEditUsername(true);
  const handleUsernameClose = () => setShowEditUsername(false);

  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const handleCheckPasswordOpen = () => setShowCheckPassword(true);
  const handleCheckPasswordClose = () => setShowCheckPassword(false);

  const [showEditPassword, setShowEditPassword] = useState(false);
  const handleEditPasswordOpen = () => setShowEditPassword(true);
  const handleEditPasswordClose = () => setShowEditPassword(false);

  const [showEditPhone, setShowEditPhone] = useState(false);
  const handlePhoneOpen = () => setShowEditPhone(true);
  const handlePhoneClose = () => setShowEditPhone(false);

  const [showAddress, setShowAddress] = useState(false);
  const handleAddressOpen = () => setShowAddress(true);
  const handleAddressClose = () => setShowAddress(false);

  const [idxAddress, setIdxAddress] = useState(null);

  const [showEditAddress, setShowEditAddress] = useState(false);
  const handleEditAddressOpen = (addressId) => {
    handleAddressClose();
    setShowEditAddress(true);
    setIdxAddress(addressId);
    const asd = userAddress[addressId].id;
    setSelectedAddressId(asd);
  };

  const handleEditAddressClose = () => {
    setShowEditAddress(false);
    setIdxAddress(null);
  };

  const [showNewAddress, setShowNewAddress] = useState(false);
  const handleNewAddressOpen = () => {
    setShowNewAddress(true);
    handleAddressClose();
  };
  const handleNewAddressClose = () => {
    setShowNewAddress(false);
  };

  const params = useParams();

  useEffect(() => {
    const fetchUser = () => {
      Axios.get(`${API_URL}/users/get-user-byId/${params.userId}`)
        .then((res) => {
          setUser(res.data);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchUser();

    const fetchAddresses = () => {
      Axios.get(`${API_URL}/users/get-address-byUserId/${params.userId}`)
        .then((res) => {
          setUserAddress(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchAddresses();
  }, [params.userId]);
  // console.log("user:", user);
  // console.log(userAddress);

  const formikName = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name too short")
        .max(50, "Name too long")
        .required("Name required"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      Axios.patch(`${API_URL}/users/edit-user/${params.userId}`, values)
        .then((res) => {
          handleNameClose();
          setUser(res.data.user);
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

  const formikUsername = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 character or less")
        .required("Username required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      Axios.patch(`${API_URL}/users/edit-user/${params.userId}`, values)
        .then((res) => {
          handleUsernameClose();
          setUser(res.data.user);
          // console.log(res.data.user);
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

  const formikPassword = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      Axios.post(`${API_URL}/users/check-password/${params.userId}`, values)
        .then((res) => {
          console.log(res.data.success);
          handleEditPasswordOpen();
          setShowCheckPassword(false);
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            icon: "error",
          });
        });
    },
  });

  const formikNewPassword = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
          "Password must contain at least eight characters, at least one number and both lower and uppercase letters, and special characters"
        )
        .required("Password required"),
      confirmPassword: Yup.string().when("newPassword", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("newPassword")],
          "password not match"
        ),
      }),
    }),
    onSubmit: (values) => {
      // console.log(values);
      Axios.patch(`${API_URL}/users/change-password/${params.userId}`, values)
        .then((res) => {
          setShowEditPassword(false);
          Swal.fire({
            title: res.data.message,
            icon: "success",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: err.message,
            icon: "error",
          });
        });
    },
  });

  // console.log(checkPassword);

  const formikPhone = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Invalid phone number"
        )
        .required("Phone number required"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      Axios.patch(`${API_URL}/users/edit-user/${params.userId}`, values)
        .then((res) => {
          handlePhoneClose();
          setUser(res.data.user);
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

  const formikAddAddress = useFormik({
    initialValues: {
      street: "",
      district: "",
      city: "",
      province: "",
      postal_code: "",
    },
    validationSchema: Yup.object({
      street: Yup.string().required("Street required"),
      district: Yup.string().required("District required"),
      city: Yup.string().required("City required"),
      province: Yup.string().required("Province required"),
      postal_code: Yup.number()
        .required("Postal code required")
        .positive()
        .integer("Must be a number"),
    }),
    onSubmit: (values, actions) => {
      values["id"] = +params.userId;
      // console.log(values);
      Axios.post(`${API_URL}/users/add-user-address/${params.userId}`, values)
        .then((res) => {
          handleAddressClose();
          handleNewAddressClose();
          setUserAddress(res.data);
          actions.resetForm({
            values: {
              street: "",
              district: "",
              city: "",
              province: "",
              postal_code: "",
            },
          });
          console.log(res.data);
          Swal.fire({ title: "Address added", icon: "success" });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  });

  const formikEditAddress = useFormik({
    initialValues: {
      street: "",
      district: "",
      city: "",
      province: "",
      postal_code: "",
    },
    validationSchema: Yup.object({
      street: Yup.string().required("Street required"),
      district: Yup.string().required("District required"),
      city: Yup.string().required("City required"),
      province: Yup.string().required("Province required"),
      postal_code: Yup.number()
        .required("Postal code required")
        .positive()
        .integer("Must be a number"),
    }),
    onSubmit: (values) => {
      values["id"] = selectedAddressId;
      Axios.patch(`${API_URL}/users/edit-user-address/${params.userId}`, values)
        .then((res) => {
          handleEditAddressClose();
          handleAddressClose();
          let tempUserAddress = userAddress;
          tempUserAddress[idxAddress] = res.data;
          setNewUserAddress(tempUserAddress);
          Swal.fire({
            title: "Address edited",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  });

  const deleteAddressBtn = (addressId) => {
    setIdxAddress(addressId);
    const id = userAddress[addressId].id;
    setSelectedAddressId(id);

    let deletedId = { id: id };
    console.log(deletedId);

    Axios.delete(`${API_URL}/users/delete-user-address/${params.userId}`, {
      data: deletedId,
    })
      .then((res) => {
        setUserAddress(res.data.dataNew);
        setSelectedAddressId(null);
        Swal.fire({
          title: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (!localStorage.getItem("token_shutter")) {
    return (
      Swal.fire({
        icon: "error",
        timer: 3000,
        text: "You don't have access to this page",
      }),
      (<Navigate to="/" />)
    );
  } else {
    return (
      <Container>
        <Left>
          <Card style={{ height: "480px", width: "350px" }}>
            <Card.Body className="d-flex flex-column justify-content-around">
              <h3>Profile</h3>

              {/* Name */}
              <Row>
                <div className="d-flex flex-row justify-content-between">
                  <h6 className="mb-1 me-2">Name</h6>
                  <EditIcon
                    fontSize="small"
                    onClick={handleNameOpen}
                    style={{ cursor: "pointer", color: "blue" }}
                  />
                </div>
                <div className="col-sm-9 text-secondary">
                  {user.name}
                  <Modal show={showEditName} onHide={handleNameClose} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Name"
                        className="mb-3"
                        name="name"
                        onChange={formikName.handleChange}
                        onBlur={formikName.handleBlur}
                        value={formikName.values.name}
                        error={
                          formikName.touched.name &&
                          Boolean(formikName.errors.name)
                        }
                        helperText={
                          formikName.touched.name && formikName.errors.name
                        }
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <h6 className="text-secondary">
                        Make sure your name is right
                      </h6>
                      <Button
                        variant="success"
                        onClick={formikName.handleSubmit}
                      >
                        Save
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Row>

              {/* Username */}
              <Row>
                <div className="d-flex flex-row justify-content-between">
                  <h6 className="mb-1 me-2">Username</h6>
                  <EditIcon
                    fontSize="small"
                    onClick={handleUsernameOpen}
                    style={{ cursor: "pointer", color: "blue" }}
                  />
                </div>
                <div className="col-sm-9 text-secondary">
                  {user.username}
                  <Modal
                    show={showEditUsername}
                    onHide={handleUsernameClose}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Username</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Username"
                        className="mb-3"
                        name="username"
                        onChange={formikUsername.handleChange}
                        onBlur={formikUsername.handleBlur}
                        value={formikUsername.values.username}
                        error={
                          formikUsername.touched.username &&
                          Boolean(formikUsername.errors.username)
                        }
                        helperText={
                          formikUsername.touched.username &&
                          formikUsername.errors.username
                        }
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <h6 className="text-secondary">
                        Make sure your username is right
                      </h6>
                      <Button
                        variant="success"
                        onClick={formikUsername.handleSubmit}
                      >
                        Save
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Row>

              {/* Email */}
              <Row>
                <h6 className="mb-1">Email</h6>
                <div className="col-sm-9 text-secondary">{user.email}</div>
              </Row>

              {/* Password */}
              <Row>
                <div className="d-flex flex-row justify-content-between">
                  <h6 className="mb-1 me-2">Password</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <Link
                    onClick={handleCheckPasswordOpen}
                    underline="hover"
                    style={{
                      cursor: "pointer",
                      color: "blue",
                    }}
                  >
                    {"Change Password"}
                  </Link>

                  {/* Modal Check Password */}
                  <Modal
                    show={showCheckPassword}
                    onHide={handleCheckPasswordClose}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Enter current password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Current Password"
                        className="mb-3"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={formikPassword.handleChange}
                        onBlur={formikPassword.handleBlur}
                        value={formikPassword.values.password}
                        error={
                          formikPassword.touched.password &&
                          Boolean(formikPassword.errors.password)
                        }
                        helperText={
                          formikPassword.touched.password &&
                          formikPassword.errors.password
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="success"
                        onClick={formikPassword.handleSubmit}
                      >
                        Submit
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* Modal Edit Password */}
                  <Modal
                    show={showEditPassword}
                    onHide={handleEditPasswordClose}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="New Password"
                        className="mb-3"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        onChange={formikNewPassword.handleChange}
                        onBlur={formikNewPassword.handleBlur}
                        value={formikNewPassword.values.newPassword}
                        error={
                          formikNewPassword.touched.newPassword &&
                          Boolean(formikNewPassword.errors.newPassword)
                        }
                        helperText={
                          formikNewPassword.touched.newPassword &&
                          formikNewPassword.errors.newPassword
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Password Confirmation"
                        className="mb-3"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        onChange={formikNewPassword.handleChange}
                        onBlur={formikNewPassword.handleBlur}
                        value={formikNewPassword.values.confirmPassword}
                        error={
                          formikNewPassword.touched.confirmPassword &&
                          Boolean(formikNewPassword.errors.confirmPassword)
                        }
                        helperText={
                          formikNewPassword.touched.confirmPassword &&
                          formikNewPassword.errors.confirmPassword
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="success"
                        onClick={formikNewPassword.handleSubmit}
                      >
                        Submit
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Row>

              {/* Phone Number */}
              <Row>
                <div className="d-flex flex-row justify-content-between">
                  <h6 className="mb-1 me-2">Phone Number</h6>
                  <EditIcon
                    fontSize="small"
                    onClick={handlePhoneOpen}
                    style={{ cursor: "pointer", color: "blue" }}
                  />
                </div>
                <div className="col-sm-9 text-secondary">
                  {user.phone}
                  <Modal
                    show={showEditPhone}
                    onHide={handlePhoneClose}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Phone Number</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Phone Number"
                        className="mb-3"
                        name="phone"
                        onChange={formikPhone.handleChange}
                        onBlur={formikPhone.handleBlur}
                        value={formikPhone.values.phone}
                        error={
                          formikPhone.touched.phone &&
                          Boolean(formikPhone.errors.phone)
                        }
                        helperText={
                          formikPhone.touched.phone && formikPhone.errors.phone
                        }
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <h6 className="text-secondary">
                        Make sure your phone number is right
                      </h6>
                      <Button
                        variant="success"
                        onClick={formikPhone.handleSubmit}
                      >
                        Save
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Row>

              {/* Address */}
              <Row>
                <div className="d-flex flex-row justify-content-between">
                  <h6 className="mb-1">Address</h6>
                  {userAddress.length > 0 ? (
                    <Link
                      onClick={handleAddressOpen}
                      underline="hover"
                      style={{
                        cursor: "pointer",
                        color: "blue",
                      }}
                    >
                      {"View All"}
                    </Link>
                  ) : (
                    <Link
                      onClick={handleNewAddressOpen}
                      underline="hover"
                      style={{ cursor: "pointer" }}
                    >
                      {"Add New Address"}
                    </Link>
                  )}
                </div>
                <div className="col-sm-9 text-secondary">
                  {userAddress.length > 0 ? userAddress[0].street : "-"}

                  {/* View All Address Modal */}
                  <Modal
                    show={showAddress}
                    onHide={handleAddressClose}
                    centered
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Addresses</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ul>
                        {userAddress.length > 0 ? (
                          userAddress.map((item, index) => {
                            return (
                              <li key={index}>
                                <div className="d-flex flex-row justify-content-between my-2">
                                  <div className="isi">
                                    {item.street}, {item.district}, {item.city},{" "}
                                    {item.province}, {item.postal_code}{" "}
                                  </div>
                                  <div className="pencet">
                                    <EditIcon
                                      onClick={() =>
                                        handleEditAddressOpen(index)
                                      }
                                      style={{
                                        cursor: "pointer",
                                        color: "#273f87",
                                      }}
                                    />
                                    <DeleteIcon
                                      onClick={() => deleteAddressBtn(index)}
                                      style={{
                                        cursor: "pointer",
                                        color: "#b25555",
                                        marginLeft: "5px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        ) : (
                          <CircularProgress />
                        )}
                      </ul>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="success" onClick={handleNewAddressOpen}>
                        Add New Address
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* Edit One Address Modal */}
                  <Modal
                    show={showEditAddress}
                    onHide={handleEditAddressClose}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Street"
                        className="mb-3"
                        name="street"
                        onChange={formikEditAddress.handleChange}
                        onBlur={formikEditAddress.handleBlur}
                        value={formikEditAddress.values.street}
                        error={
                          formikEditAddress.touched.street &&
                          Boolean(formikEditAddress.errors.street)
                        }
                        helperText={
                          formikEditAddress.touched.street &&
                          formikEditAddress.errors.street
                        }
                      />
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="District"
                        className="mb-3"
                        name="district"
                        onChange={formikEditAddress.handleChange}
                        onBlur={formikEditAddress.handleBlur}
                        value={formikEditAddress.values.district}
                        error={
                          formikEditAddress.touched.district &&
                          Boolean(formikEditAddress.errors.district)
                        }
                        helperText={
                          formikEditAddress.touched.district &&
                          formikEditAddress.errors.district
                        }
                      />
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="City"
                        className="mb-3"
                        name="city"
                        onChange={formikEditAddress.handleChange}
                        onBlur={formikEditAddress.handleBlur}
                        value={formikEditAddress.values.city}
                        error={
                          formikEditAddress.touched.city &&
                          Boolean(formikEditAddress.errors.city)
                        }
                        helperText={
                          formikEditAddress.touched.city &&
                          formikEditAddress.errors.city
                        }
                      />
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Province"
                        className="mb-3"
                        name="province"
                        onChange={formikEditAddress.handleChange}
                        onBlur={formikEditAddress.handleBlur}
                        value={formikEditAddress.values.province}
                        error={
                          formikEditAddress.touched.province &&
                          Boolean(formikEditAddress.errors.province)
                        }
                        helperText={
                          formikEditAddress.touched.province &&
                          formikEditAddress.errors.province
                        }
                      />
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Postal Code"
                        className="mb-3"
                        name="postal_code"
                        onChange={formikEditAddress.handleChange}
                        onBlur={formikEditAddress.handleBlur}
                        value={formikEditAddress.values.postal_code}
                        error={
                          formikEditAddress.touched.postal_code &&
                          Boolean(formikEditAddress.errors.postal_code)
                        }
                        helperText={
                          formikEditAddress.touched.postal_code &&
                          formikEditAddress.errors.postal_code
                        }
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <h6 className="text-secondary">
                        Make sure your address is right
                      </h6>
                      <Button
                        variant="success"
                        onClick={formikEditAddress.handleSubmit}
                      >
                        Save
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* Modal New Address */}
                  <Modal
                    show={showNewAddress}
                    onHide={handleNewAddressClose}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Add New Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Street"
                        className="mb-3"
                        name="street"
                        onChange={formikAddAddress.handleChange}
                        onBlur={formikAddAddress.handleBlur}
                        value={formikAddAddress.values.street}
                        error={
                          formikAddAddress.touched.street &&
                          Boolean(formikAddAddress.errors.street)
                        }
                        helperText={
                          formikAddAddress.touched.street &&
                          formikAddAddress.errors.street
                        }
                      />
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="District"
                        className="mb-3"
                        name="district"
                        onChange={formikAddAddress.handleChange}
                        onBlur={formikAddAddress.handleBlur}
                        value={formikAddAddress.values.district}
                        error={
                          formikAddAddress.touched.district &&
                          Boolean(formikAddAddress.errors.district)
                        }
                        helperText={
                          formikAddAddress.touched.district &&
                          formikAddAddress.errors.district
                        }
                      />
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="City"
                        className="mb-3"
                        name="city"
                        onChange={formikAddAddress.handleChange}
                        onBlur={formikAddAddress.handleBlur}
                        value={formikAddAddress.values.city}
                        error={
                          formikAddAddress.touched.city &&
                          Boolean(formikAddAddress.errors.city)
                        }
                        helperText={
                          formikAddAddress.touched.city &&
                          formikAddAddress.errors.city
                        }
                      />
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Province"
                        className="mb-3"
                        name="province"
                        onChange={formikAddAddress.handleChange}
                        onBlur={formikAddAddress.handleBlur}
                        value={formikAddAddress.values.province}
                        error={
                          formikAddAddress.touched.province &&
                          Boolean(formikAddAddress.errors.province)
                        }
                        helperText={
                          formikAddAddress.touched.province &&
                          formikAddAddress.errors.province
                        }
                      />
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Postal Code"
                        className="mb-3"
                        name="postal_code"
                        onChange={formikAddAddress.handleChange}
                        onBlur={formikAddAddress.handleBlur}
                        value={formikAddAddress.values.postal_code}
                        error={
                          formikAddAddress.touched.postal_code &&
                          Boolean(formikAddAddress.errors.postal_code)
                        }
                        helperText={
                          formikAddAddress.touched.postal_code &&
                          formikAddAddress.errors.postal_code
                        }
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <h6 className="text-secondary">
                        Make sure your address is right
                      </h6>
                      <Button
                        variant="success"
                        onClick={formikAddAddress.handleSubmit}
                      >
                        Submit
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Left>
        <Right>
          <Card style={{ width: "600px" }} className="ms-2 mb-2">
            <Card.Body className="text-center">
              <h4>Transaction History</h4>
            </Card.Body>
          </Card>
          <History />
        </Right>
      </Container>
    );
  }
};

export default Profile;
