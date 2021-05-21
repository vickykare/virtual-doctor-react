import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function Profile() {
  const history = useHistory();

  let data = {
    firstName: "vikas",
    lastName: "kare",
    email: "vikaskare073@gmail.com",
    mobile: "9730398383",
    age: "23",
    bloodGroup: "NA",
    bpProblem: "No",
    majorHealthIssue: "No",
    city: "gherdi",
    anyOperation: "No",
  };
  const [state, setState] = useState({ data: data });

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md={8} className="p-3 border">
          <h1 className="text-center py-3">User Profile</h1>
          <hr />
          <Row>
            <Col md={6}>
              <h5>Name</h5>
              <p>
                {state.data.firstName} {state.data.lastName}
              </p>
            </Col>
            <Col md={6}>
              <h5>Email</h5>
              <p>{state.data.email}</p>
            </Col>
            <Col md={6}>
              <h5>Mobile</h5>
              <p>{state.data.mobile}</p>
            </Col>
            <Col md={6}>
              <h5>Age</h5>
              <p>{state.data.age}</p>
            </Col>
            <Col md={6}>
              <h5>Blood Group</h5>
              <p>{state.data.bloodGroup}</p>
            </Col>
            <Col md={6}>
              <h5>BP Problem</h5>
              <p>{state.data.bpProblem}</p>
            </Col>
            <Col md={6}>
              <h5>Major Health Problem</h5>
              <p>{state.data.majorHealthIssue}</p>
            </Col>
            <Col md={6}>
              <h5>City</h5>
              <p>{state.data.city}</p>
            </Col>
            <Col md={6}>
              <h5>Any Operations</h5>
              <p>{state.data.anyOperation}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
