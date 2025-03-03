import React from "react";
import { Button } from "react-bootstrap";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const NavBar = ({ onLogout }) => {
  const empRole = localStorage.getItem("userRole");

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Stark Industries</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/inout">
              In-Out
            </Nav.Link>
            <Nav.Link href="#ToDo">ToDo</Nav.Link>
            <Nav.Link as={Link} to="/leaves">
              Leaves
            </Nav.Link>
            <Nav.Link as={Link} to="/timeSheet">
              TimeSheet
            </Nav.Link>
            <Nav.Link as={Link} to="/payroll">
              Payroll
            </Nav.Link>
            {empRole === "ADMIN" && "MANAGER" ? (
              <Nav.Link as={Link} to="/manageLeaves">
                Manage Leaves
              </Nav.Link>
            ) : null}
            {empRole === "ADMIN" && "MANAGER" ? (
              <Nav.Link as={Link} to="/manageRoles">
                Manage Roles
              </Nav.Link>
            ) : null}
          </Nav>
          <Nav className="ms-auto">
            {" "}
            {/* This pushes the button to the corner */}
            <Button onClick={onLogout} variant="outline-danger">
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
