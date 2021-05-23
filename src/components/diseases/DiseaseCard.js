import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function DiseaseCard({ title, url }) {
  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <hr />
          {/* <Card.Subtitle className="mb-2 text-muted">
            check for {title}
          </Card.Subtitle> */}
          <Card.Text>Check for disease by entering symptoms.</Card.Text>
          <hr />
          <Link to={url}>
            <Button variant="secondary" className={"btn-outline-secondary"}>
              Check for it
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default DiseaseCard;
