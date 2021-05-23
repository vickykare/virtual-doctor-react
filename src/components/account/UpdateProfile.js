import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useHistory } from "react-router-dom";
import { loginContext } from "../../App";
import axios from "axios";

function UpdateProfile() {
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(loginContext);
  if (!loggedIn) {
    history.push("/login");
  }
  const animatedComponents = makeAnimated();
  const [state, setState] = useState({});
  const [responseError, setResponseError] = useState(null);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/account/profile/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).access,
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          setState({
            firstName: response.data.user.first_name,
            lastName: response.data.user.last_name,
            email: response.data.user.email,
            mobile: response.data.profile.mobile,
            age: response.data.profile.age,
            bloodGroup: response.data.profile.blood_group,
            bpProblem: response.data.profile.bp_problem,
            majorHealthIssue: response.data.profile.major_health_problem,
            city: response.data.profile.city,
            anyOperation: response.data.profile.any_operation,
          });
        }
      })
      .catch(function (error) {
        if (error.response) {
          setResponseError(error.response.data.detail);
        } else {
          setResponseError("Something went wrong! Please try again.");
        }
      });
  }, []);

  const ageOptions = [];
  for (let i = 1; i < 120; i++) {
    ageOptions.push({ value: i.toString(), label: i.toString() });
  }
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
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
    { value: "mild", label: "Mild" },
  ];
  const majorHealthIssueOptions = [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = {
    // user: {
    //   first_name: state.firstName,
    //   last_name: state.lastName,
    //   email: state.email,
    // },
    // profile: {
    //   mobile: state.mobile,
    //   age: state.age,
    //   bp_problem: state.bpProblem,
    //   blood_group: state.bloodGroup,
    //   major_health_problem: state.majorHealthIssue,
    //   any_operation: state.anyOperation,
    // },
    // };
    axios({
      method: "put",
      url: "http://127.0.0.1:8000/api/account/profile/update/",
      data: state,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).access,
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          history.push("/profile");
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
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
        <Col md={10} className="py-3">
          <h3 className="text-center">Update Details</h3>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicEmail" className="pb-3">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={state.firstName}
                    onChange={(e) =>
                      setState({ ...state, firstName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formBasicEmail" className="pb-3" md={6}>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={state.lastName}
                    onChange={(e) =>
                      setState({ ...state, lastName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formBasicEmail" className="pb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="username"
                    placeholder="Enter email"
                    value={state.email}
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formBasicPassword" className="pb-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                    value={state.mobile}
                    onChange={(e) =>
                      setState({ ...state, mobile: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* age */}
                <Form.Group controlId="formBasicPassword" className="pb-3">
                  <Form.Label>Age</Form.Label>
                  <Select
                    components={animatedComponents}
                    name="age"
                    options={ageOptions}
                    classNamePrefix="select"
                    value={bloodGroupOptions.filter(
                      (option) => option.value === state.age
                    )}
                    onChange={(e) => setState({ ...state, age: e.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* blood type */}
                <Form.Group controlId="formBasicPassword" className="pb-3">
                  <Form.Label>Blood Group</Form.Label>
                  <Select
                    components={animatedComponents}
                    name="bloodGroup"
                    options={bloodGroupOptions}
                    classNamePrefix="select"
                    value={bloodGroupOptions.filter(
                      (option) => option.value === state.bloodGroup
                    )}
                    onChange={(e) =>
                      setState({ ...state, bloodGroup: e.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* bp problem */}
                <Form.Group controlId="formBasicPassword" className="pb-3">
                  <Form.Label>Blood Pressure Problem</Form.Label>
                  <Select
                    components={animatedComponents}
                    name="bpProblem"
                    options={bloodPressureProblemOptions}
                    classNamePrefix="select"
                    value={bloodPressureProblemOptions.filter(
                      (option) => option.value === state.bpProblem
                    )}
                    onChange={(e) =>
                      setState({
                        ...state,
                        bpProblem: e.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* major health problem */}
                <Form.Group controlId="formBasicPassword" className="pb-3">
                  <Form.Label>Major Health Problem</Form.Label>
                  <Select
                    components={animatedComponents}
                    name="majorHealthIssue"
                    options={majorHealthIssueOptions}
                    classNamePrefix="select"
                    value={majorHealthIssueOptions.filter(
                      (option) => option.value === state.majorHealthIssue
                    )}
                    onChange={(e) =>
                      setState({
                        ...state,
                        majorHealthIssue: e.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formBasicPassword" className="pb-3">
                  <Form.Label>Any Operations</Form.Label>
                  <Select
                    components={animatedComponents}
                    name="anyOperation"
                    options={majorHealthIssueOptions}
                    classNamePrefix="select"
                    value={majorHealthIssueOptions.filter(
                      (option) => option.value === state.anyOperation
                    )}
                    onChange={(e) =>
                      setState({
                        ...state,
                        anyOperation: e.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formBasicCity" className="pb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="City"
                    value={state.city}
                  />
                </Form.Group>
              </Col>
              {/* major health problem */}

              <Col md={8}>
                <Button variant="primary" type="submit" className="my-3">
                  Update Profile
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default UpdateProfile;
