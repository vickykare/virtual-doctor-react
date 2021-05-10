import React from "react";
import { Container, Navbar } from "react-bootstrap";

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            {/* <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "} */}
            Virtual Doctor
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
