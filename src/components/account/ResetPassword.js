import React from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
function ResetPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md={6} className="py-3">
          <h3>Reset Password</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername" className="py-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={"username"}
                // onChange={}
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
                value={"password"}
                // onChange={}
              />
            </Form.Group>
            {/* {error && <p className="text-danger">{error}</p>}
            {responseError && <p className="text-danger">{responseError}</p>} */}
            <p>
              <Link to="/login">Login here</Link>
            </p>
            <Button variant="primary" type="submit" className="">
              Send request
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default ResetPassword;
