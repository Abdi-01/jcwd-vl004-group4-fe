import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import { connect } from "react-redux";
import { authUserLogout } from "../redux/actions/userAction";
import { authAdminLogout } from "../redux/actions/adminAction";


const MyNavbar = (props) => {
  const user = useSelector((state) => state.authUserLogin);
  const admin = useSelector((state) => state.authAdminLogin);
  const count = useSelector(state => state.cartReducer.cartCount)

  const navigate = useNavigate();
  const dispatch = useDispatch()


  const onUserLogout = () => {
    props.authUserLogout();
    dispatch({
      type: 'CLEAR_CART'
    })
    navigate("/");
  };

  const onAdminLogout = () => {
    props.authAdminLogout();
    navigate("/");
  };

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="d-flex flex-row justify-content-between nav-main"
      bg="light"
      style={{ height: "60px" }}
    >
      <div className="nav-left ms-5">
        <Navbar.Brand as={Link} to="/">
          Pharmacy-App-4
        </Navbar.Brand>
      </div>
      <div className="nav-center">
        <Nav>
          <Nav.Link as={Link} to="/product-list">
            Products
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            About Us
          </Nav.Link>
        </Nav>
      </div>
      {admin.username ? (
        <div className="nav-right me-5">
          <Nav>
            <Nav.Link as={Link} to="/profile">
              {admin.username} || admin
            </Nav.Link>
            <Nav.Link onClick={onAdminLogout}>Logout</Nav.Link>
          </Nav>
        </div>
      ) : user.username ? (
        <div className="nav-right me-5">
          <Nav>
            <Nav.Link as={Link} to="/profile">
              {user.username}
            </Nav.Link>
            <Nav.Link onClick={onUserLogout}>Logout</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <Badge badgeContent={count} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Nav.Link>
          </Nav>
        </div>
      ) : (
        <div className="nav-right me-5">
          <Nav>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </div>
      )}
    </Navbar>
  );
};

export default connect(null, { authUserLogout, authAdminLogout })(MyNavbar);
