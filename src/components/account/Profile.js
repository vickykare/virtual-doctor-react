import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { loginContext } from "../../App";

function Profile() {
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(loginContext);
  if (!loggedIn) {
    history.push("/login");
  }
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
            username: response.data.user.username,
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
  return (
    <>
      {responseError ? (
        <h1 className="text-center my-5 text-danger">{responseError}</h1>
      ) : (
        <Row className="d-flex justify-content-center">
          <Col md={8} className="p-3 border">
            <h3 className="text-center py-3">User Profile</h3>
            <div className="d-flex justify-content-between">
              <Link to="/update-profile">Update Profile</Link>
              {/* <Link to="/history">History</Link> */}
            </div>
            <hr />
            <Row>
              <Col md={6}>
                <h5>Name</h5>
                <p>
                  {state.firstName} {state.lastName}
                </p>
              </Col>
              <Col md={6}>
                <h5>Username</h5>
                <p>{state.username}</p>
              </Col>
              <Col md={6}>
                <h5>Email</h5>
                <p>{state.email}</p>
              </Col>
              <Col md={6}>
                <h5>Mobile</h5>
                <p>{state.mobile}</p>
              </Col>
              <Col md={6}>
                <h5>Age</h5>
                <p>{state.age}</p>
              </Col>
              <Col md={6}>
                <h5>Blood Group</h5>
                <p>{state.bloodGroup}</p>
              </Col>
              <Col md={6}>
                <h5>BP Problem</h5>
                <p>{state.bpProblem}</p>
              </Col>
              <Col md={6}>
                <h5>Major Health Problem</h5>
                <p>{state.majorHealthIssue}</p>
              </Col>
              <Col md={6}>
                <h5>City</h5>
                <p>{state.city}</p>
              </Col>
              <Col md={6}>
                <h5>Any Operations</h5>
                <p>{state.anyOperation}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Profile;
