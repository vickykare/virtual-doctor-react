import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
  const history = useHistory();
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
          let udata = JSON.parse(localStorage.getItem("userData"));
          console.log(udata.refresh);
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
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleUsername}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
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
            <p>
              Don't have an account? <Link to="/register">Signup here</Link>
            </p>
            <Button variant="primary" type="submit" className="">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Login;
