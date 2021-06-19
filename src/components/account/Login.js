import React, { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { loginContext } from "../../App";

function Login() {
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(loginContext);

  if (loggedIn) {
    history.push("/");
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [responseError, setResponseError] = useState("");

  let handleUsername = (event) => {
    setUsername(event.target.value);
  };

  let handlePassword = (event) => {
    setPassword(event.target.value);
  };
  let handleLogin = (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      setError("*All fields are required");
      return;
    }
    setError("");
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
          history.push("/");
        }
      })
      .catch(function (error) {
        if (error.response) {
          setResponseError(error.response.data.detail);
        } else {
          setResponseError("Something went wrong! Please try again.");
        }
      });
  };
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md={6} className="py-3">
          <h1>Login</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicUsername" className="py-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleUsername}
              />
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
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            {responseError && <p className="text-danger">{responseError}</p>}
            {/* <p>
              <Link to="/reset-password">Forgot password?</Link>
            </p> */}
            <Button variant="primary" type="submit" className="">
              Login
            </Button>
            <p>
              Don't have an account? <Link to="/register">Signup here</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Login;
