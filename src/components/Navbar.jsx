import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap";
import { FaUser, FaSignOutAlt, FaAlignJustify } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CustomNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      {user.role == "admin" ? (
        <Container fluid>
          {/* Company Logo */}
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <FaAlignJustify />
          </Navbar.Brand>

          <div className="justify-content-end">
              <Dropdown
                show={showDropdown}
                onToggle={(nextShow) => setShowDropdown(nextShow)}
              >
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="d-flex align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <div className="me-2">
                      <FaUser className="text-primary" />
                    </div>
                    <div className="text-start">
                      <div className="fw-bold">{user?.name}</div>
                      <small className="text-muted">{user?.role}</small>
                    </div>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="mt-2">
                  <Dropdown.Item
                    href="#"
                    onClick={handleLogout}
                    className="text-danger"
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </div>
        </Container>
      ) : (
        <Container fluid>
          {/* Company Logo */}
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <Image src={Logo} alt="Company Logo" height="40" className="me-2" />
            <span className="fw-bold text-primary">TicketMaster</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {/* User Profile Dropdown */}
              <Dropdown
                show={showDropdown}
                onToggle={(nextShow) => setShowDropdown(nextShow)}
              >
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="d-flex align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <div className="me-2">
                      <FaUser className="text-primary" />
                    </div>
                    <div className="text-start">
                      <div className="fw-bold">{user?.name}</div>
                      <small className="text-muted">{user?.role}</small>
                    </div>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="mt-2">
                  <Dropdown.Item
                    href="#"
                    onClick={handleLogout}
                    className="text-danger"
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      )}
    </Navbar>
  );
};

export default CustomNavbar;
