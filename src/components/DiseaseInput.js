import React, { useState, useContext } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PredictDisease from "./PredictDisease";
import axios from "axios";
import Disease from "./diseases/Disease";
import { loginContext } from "../App";

function DiseaseInput() {
  const { loggedIn, setLoggedIn } = useContext(loginContext);
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
    let headers = {};
    if (loggedIn) {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).access,
      };
    } else {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/predict/",
      data,
      headers: headers,
    })
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          setState({
            values: state.values,
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
    { value: "abdominal_pain", label: "abdominal pain" },
    { value: "bladder_discomfort", label: "bladder discomfort" },
    { value: "chest_pain", label: "chest pain" },
    { value: "chills", label: "chills" },
    { value: "coma", label: "coma" },
    { value: "constipation", label: "constipation" },
    { value: "cough", label: "cough" },
    { value: "diarrhoea", label: "diarrhoea" },
    { value: "dizziness", label: "dizziness" },
    { value: "fatigue", label: "fatigue" },
    { value: "headache", label: "headache" },
    { value: "high_fever", label: "high fever" },
    { value: "irritability", label: "irritability" },
    { value: "itching", label: "itching" },
    { value: "joint_pain", label: "joint pain" },
    { value: "loss_of_appetite", label: "loss of appetite" },
    { value: "loss_of_balance", label: "loss of balance" },
    { value: "loss_of_smell", label: "loss of smell" },
    { value: "malaise", label: "malaise" },
    { value: "mild_fever", label: "mild fever" },
    { value: "movement_stiffness", label: "movement stiffness" },
    { value: "muscle_pain", label: "muscle pain" },
    { value: "muscle_weakness", label: "muscle weakness" },
    { value: "nausea", label: "nausea" },
    { value: "painful_walking", label: "painful walking" },
    { value: "polyuria", label: "polyuria" },
    { value: "red_sore_around_nose", label: "red sore around nose" },
    { value: "skin_rash", label: "skin rash" },
    { value: "slurred_speech", label: "slurred speech" },
    { value: "stomach_pain", label: "stomach pain" },
    { value: "vomiting", label: "vomiting" },
    { value: "yellowing_of_eyes", label: "yellowing of eyes" },
    { value: "yellowish_skin", label: "yellowish skin" },
  ];
  return (
    <>
      <Container>
        <Form onSubmit={handlesubmit}>
          <Row className="d-flex justify-content-center py-5">
            <Col md={6}>
              <h3 className="py-3">Select Symptoms</h3>
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
              <Button className="my-3" type="submit">
                Predict Disease
              </Button>
            </Col>
          </Row>
        </Form>
        <hr />
        <Disease />
      </Container>
    </>
  );
}

export default DiseaseInput;
