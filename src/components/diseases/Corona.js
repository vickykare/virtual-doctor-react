import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
function Corona() {
  const [state, setState] = useState({});
  const [responseError, setResponseError] = useState(null);
  const checkForCorona = (e) => {
    e.preventDefault();
    if (
      !state.age ||
      !state.fever ||
      !state.bodyPain ||
      !state.runnyNose ||
      !state.breathingProblem
    ) {
      setResponseError("all fields are required");
      return;
    }
    setResponseError(null);
    console.log(state);
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/predict/corona/",
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
          setState({
            ...state,
            probability: response.data.probability,
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
  };
  return (
    <>
      <h3 className="text-center py-3">Enter Details</h3>
      <Form onSubmit={checkForCorona}>
        <Row className="d-flex justify-content-center">
          <Col md={4}>
            <Form.Group controlId="formBasicFever" className="pb-3">
              <Form.Label>Fever</Form.Label>
              <Form.Control
                type="number"
                name="fever"
                placeholder="Enter temperature..."
                value={state.fever}
                onChange={(e) => setState({ ...state, fever: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formBasicAge" className="pb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Enter age..."
                value={state.age}
                onChange={(e) => setState({ ...state, age: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formBasicBodyPain" className="pb-3">
              <Form.Label>Body Pain</Form.Label>
              <Form.Control
                name="bodyPain"
                as="select"
                value={state.bodyPain}
                onChange={(e) =>
                  setState({ ...state, bodyPain: e.target.value })
                }
              >
                <option>Select ...</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formBasicRunnyNose" className="pb-3">
              <Form.Label>Runny Nose</Form.Label>
              <Form.Control
                name="runnyNose"
                as="select"
                value={state.runnyNose}
                onChange={(e) =>
                  setState({ ...state, runnyNose: e.target.value })
                }
              >
                <option>Select ...</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formBasicBreathingProblem" className="pb-3">
              <Form.Label>Breathing Problem</Form.Label>
              <Form.Control
                name="breathingProblem"
                as="select"
                value={state.breathingProblem}
                onChange={(e) =>
                  setState({ ...state, breathingProblem: e.target.value })
                }
              >
                <option>Select ...</option>
                <option value="-1">No</option>
                <option value="0">Little</option>
                <option value="1">Severe</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formBasicBreathingProblem" className="m-4">
              <Button type="submit">Check For Corona</Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <p className="text-center text-danger">{responseError}</p>
      <hr />
      <Row>
        {state.probability && (
          <p className="text-center ">
            The risk of having corona is
            <h3> {state.probability} %</h3>
          </p>
        )}
      </Row>
    </>
  );
}

export default Corona;
