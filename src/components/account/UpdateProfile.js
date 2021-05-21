import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
function UpdateProfile() {
  const animatedComponents = makeAnimated();
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

  const ageOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
  ];

  const bloodGroupOptions = [
    { value: "A+ve", label: "A+ve" },
    { value: "A-ve", label: "A-ve" },
    { value: "B+ve", label: "B+ve" },
    { value: "B-ve", label: "B-ve" },
    { value: "AB+ve", label: "AB+ve" },
    { value: "AB-ve", label: "AB-ve" },
    { value: "O+ve", label: "O+ve" },
    { value: "O-ve", label: "O-ve" },
  ];
  const bloodPressureProblemOptions = [
    { value: "No", label: "No" },
    { value: "Yes", label: "Yes" },
    { value: "Mild", label: "Mild" },
  ];
  const majorHealthIssueOptions = [
    { value: "No", label: "No" },
    { value: "Yes", label: "Yes" },
  ];
  let handleAgeChange = (event) => {
    return;
  };
  const [state, setstate] = useState({ data: data });
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md={8} className="py-3">
          <h1>Update Profile</h1>
          <Form>
            <Form.Group controlId="formBasicEmail" className="pb-3">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="pb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="pb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="username"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="pb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" name="mobile" placeholder="Mobile" />
            </Form.Group>
            {/* age */}
            <Form.Group controlId="formBasicPassword" className="pb-3">
              <Form.Label>Age</Form.Label>
              <Select
                components={animatedComponents}
                name="age"
                options={ageOptions}
                classNamePrefix="select"
                onChange={handleAgeChange}
              />
            </Form.Group>
            {/* blood type */}
            <Form.Group controlId="formBasicPassword" className="pb-3">
              <Form.Label>Blood Group</Form.Label>
              <Select
                components={animatedComponents}
                name="bloodGroup"
                options={bloodGroupOptions}
                classNamePrefix="select"
                // onChange={}
              />
            </Form.Group>
            {/* bp problem */}
            <Form.Group controlId="formBasicPassword" className="pb-3">
              <Form.Label>Blood Pressure Problem</Form.Label>
              <Select
                components={animatedComponents}
                name="bloodPressureProblem"
                options={bloodPressureProblemOptions}
                classNamePrefix="select"
                // onChange={}
              />
            </Form.Group>
            {/* major health problem */}
            <Form.Group controlId="formBasicPassword" className="pb-3">
              <Form.Label>Major Health Problem</Form.Label>
              <Select
                components={animatedComponents}
                name="bloodPressureProblem"
                options={majorHealthIssueOptions}
                classNamePrefix="select"
                // onChange={}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="pb-3">
              <Form.Label>Any Operations</Form.Label>
              <Select
                components={animatedComponents}
                name="bloodPressureProblem"
                options={majorHealthIssueOptions}
                classNamePrefix="select"
                // onChange={}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCity" className="pb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" placeholder="City" />
            </Form.Group>
            {/* major health problem */}

            <Button variant="primary" type="submit" className="my-3">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default UpdateProfile;
