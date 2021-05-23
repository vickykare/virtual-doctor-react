import React, { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { loginContext } from "../../App";

function Register() {
  const { loggedIn, setLoggedIn } = useContext(loginContext);
  const history = useHistory();
  if (loggedIn) {
    history.push("/");
  }
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState({});
  let handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  let handleLastName = (event) => {
    setLastName(event.target.value);
  };
  let handleUsername = (event) => {
    setUsername(event.target.value);
  };
  let handleEmail = (event) => {
    setEmail(event.target.value);
  };
  let handlePassword = (event) => {
    setPassword(event.target.value);
  };
  let handlePassword2 = (event) => {
    setPassword2(event.target.value);
  };

  let handleRegister = (event) => {
    event.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      password2 === ""
    ) {
      setError("All fields are required");
      return;
    }
    if (password !== password2) {
      setError("Passwords not matching");
      return;
    }
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: "application/json",
    // };
    // let data = {
    //   first_name: firstName,
    //   last_name: lastName,
    //   email: email,
    //   username: username,
    //   password: password,
    //   password2: password2,
    // };
    // console.log(data);
    axios
      .post("http://127.0.0.1:8000/api/account/register/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
        password2: password2,
      })
      .then(function (response) {
        if (response.data) {
          setResponse(response.data);
          axios
            .post("http://127.0.0.1:8000/api/account/login/", {
              username: username,
              password: password,
            })
            .then(function (response) {
              if (response.status === 200) {
                // console.log(response);
                localStorage.setItem("userData", JSON.stringify(response.data));
                setLoggedIn(true);
                let udata = JSON.parse(localStorage.getItem("userData"));
                console.log(udata.refresh);
                history.push("/");
              }
            })
            .catch(function (error) {
              history.push("/login");
            });
        }
      })
      .catch(function (error) {
        if (error.response) {
          setResponse({
            firstNameError: error.response.data.first_name,
            lastNameError: error.response.data.last_name,
            usernameError: error.response.data.username,
            emailError: error.response.data.email,
            passwordError: error.response.data.password,
            password2Error: error.response.data.password2,
          });
        } else {
          setError("Something went wrong! Please try again.");
        }
      });
  };
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md={6} className="py-3">
          <h1>Register</h1>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicFirstName" className="pb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="First name"
                value={firstName}
                onChange={handleFirstName}
              />{" "}
              {response.firstNameError && (
                <p className="text-danger"> {response.firstNameError}</p>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicLastNAme" className="pb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Last name"
                value={lastName}
                onChange={handleLastName}
              />{" "}
              {response.lastNameError && (
                <p className="text-danger"> {response.lastNameError}</p>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicUsername" className="pb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleUsername}
              />{" "}
              {response.usernameError && (
                <p className="text-danger"> {response.usernameError}</p>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="pb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmail}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              {response.emailError && (
                <p className="text-danger"> {response.emailError}</p>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="pb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
              {response.passwordError && (
                <p className="text-danger"> {response.passwordError}</p>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicPassword2" className="pb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={password2}
                onChange={handlePassword2}
              />
              {response.password2Error && (
                <p className="text-danger"> {response.password2Error}</p>
              )}
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <p>
              Have an account? <Link to="/login">Login Here</Link>
            </p>
            <Button variant="primary" type="submit" className="">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Register;
