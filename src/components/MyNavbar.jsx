import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const myNavbar = () => {
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
      <div className="nav-right me-5">
        <Nav>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="">
            Logout
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default myNavbar;
