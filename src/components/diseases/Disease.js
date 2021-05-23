import React from "react";
import { Row, Col } from "react-bootstrap";
import DiseaseCard from "./DiseaseCard";
const diseases = [
  {
    title: "Heart Disease",
    url: "predict/heart-disease",
  },
  {
    title: "Corona",
    url: "predict/corona",
  },
  {
    title: "Diabetes",
    url: "predict/diabetes",
  },
];
function Disease() {
  return (
    <>
      <h3 className="text-center mt-5">Search for specific disease</h3>

      <Row className="d-flex justify-content-center py-5">
        {diseases.map(({ title, url }) => (
          <Col md={3}>
            <DiseaseCard title={title} url={url} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Disease;
