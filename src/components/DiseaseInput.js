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
  const animatedComponents = makeAnimated();
  let handleChange = (e) => {
    // console.log(e.length);
    let values = [];
    for (let i = 0; i < e.length; i++) {
      values.push(e[i].value);
    }
    setState({
      values: values,
      //   disease: state.disease,
      //   message: state.message,
    });
  };
  let handlesubmit = (e) => {
    e.preventDefault();
    if (state.values.length < 4) {
      return;
    }
    let data = { data: state.values };
    // axios.post("https://www.domain.com/", data).then((response) =>
    //   setState({
    //     values: [],
    //     disease: response.data.disease,
    //     message: response.data.message,
    //   })
    // );
    setState({
      values: [],
      disease: " response.data.disease",
      message: "response.data.message",
    });
    console.log("how " + state.values);
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
              <PredictDisease disease={state.disease} message={state.message} />
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
