import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { Link, useLocation } from 'react-router-dom';
import "./Nav.css"

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NavScrollExample() {

// const location = useLocation();
const navigate = useNavigate();
const [searchText, setSearchText] = useState("");



const handleSearch = () => {

  const text = searchText.toLowerCase().trim();

  if (!text) return;

  // 👉 Your app routes
  const routes = ["home", "about", "api", "gpdp"];

  // 👉 If route exists → go inside app
  if (routes.includes(text)) {
    navigate(`/${text}`);
  } 
  // 👉 Otherwise → search on Google
  else {
    window.location.href =
      `https://www.google.com/search?q=${encodeURIComponent(text)}`;
  }
};










const location = useLocation();

  // Hide navbar on login page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <Navbar expand="lg" className="modern-navbar shadow-sm">
      <Container fluid>

        {/* Logo / Brand */}
        <Navbar.Brand className="fw-bold gradient-text">
          Student Dashboard
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto d-flex gap-4 modern-links">

            <Link className="nav-link-custom" to="/home">Home</Link>
            <Link className="nav-link-custom" to="/about">About</Link>
            <Link className="nav-link-custom" to="/api">API</Link>
            <Link className="nav-link-custom" to="/gpdp">GPDP</Link>

          </Nav>

          {/* Search */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2 modern-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();   // 🚫 stop page reload
                  handleSearch();       // ✅ call your search function
                }
              }}
            />
            <Button className="search-btn">Search</Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
