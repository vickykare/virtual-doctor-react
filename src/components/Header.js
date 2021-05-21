import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loginContext } from "../App";
function Header() {
  const loggedIn = useContext(loginContext);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="py-0 text-decoration-none text-white">
              Virtual Doctor
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="">
            {loggedIn ? (
              <Nav>
                <Nav.Link>
                  <Link to="/profile" className="nav-link py-0">
                    Profile
                  </Link>
                </Nav.Link>
                {/* <Nav.Link eventKey={2}>
                <Link to="/register" className="nav-link  py-0">
                  Signup
                </Link>
              </Nav.Link> */}
              </Nav>
            ) : (
              <Nav>
                <Nav.Link>
                  <Link to="/login" className="nav-link py-0">
                    Login
                  </Link>
                </Nav.Link>
                <Nav.Link eventKey={2}>
                  <Link to="/register" className="nav-link  py-0">
                    Signup
                  </Link>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
