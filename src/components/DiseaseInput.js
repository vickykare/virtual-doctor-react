import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PredictDisease from "./PredictDisease";
import axios from "axios";

function DiseaseInput() {
  const [state, setState] = useState({
    values: [],
    disease: null,
  });
  const [responseError, setResponseError] = useState("");
  const animatedComponents = makeAnimated();
  let handleChange = (e) => {
    let values = [];
    for (let i = 0; i < e.length; i++) {
      values.push(e[i].value);
    }
    setState({
      ...state,
      values: values,
    });
  };
  let handlesubmit = (e) => {
    e.preventDefault();
    if (state.values.length < 4) {
      return;
    }
    let data = { data: state.values };
    setResponseError("");
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/predict/",
      data,
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      // },
    })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setState({
            ...state,
            disease: response.data.disease,
            message: response.data.message,
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
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "1", label: "Chocolate" },
    { value: "2", label: "Strawberry" },
    { value: "3", label: "Vanilla" },
  ];

  return (
    <>
      <Container>
        <Form onSubmit={handlesubmit}>
          <Row className="d-flex justify-content-center py-5">
            <Col md={6}>
              <h1 className="py-3">Select Symptoms</h1>
              <Select
                components={animatedComponents}
                isMulti
                name="diseases"
                options={options}
                classNamePrefix="select"
                onChange={handleChange}
              />
              {state.values.length > 3 ? null : (
                <p className="text-warning">*Select atleast 4 symptoms</p>
              )}
              {responseError ? (
                <p className="text-center text-danger">{responseError}</p>
              ) : (
                <PredictDisease
                  disease={state.disease}
                  message={state.message}
                />
              )}
              <Button className="py-3 my-3" type="submit">
                Predict Disease
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default DiseaseInput;
