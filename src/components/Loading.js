import React from "react";
import { Spinner } from "react-bootstrap";
function Loading() {
  return (
    <div className="p-5 text-center">
      <Spinner animation="border" role="status">
        <span className="sr-only"></span>
      </Spinner>
    </div>
  );
}

export default Loading;
