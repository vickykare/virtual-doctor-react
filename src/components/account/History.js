import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
function History() {
  const [state, setState] = useState({});
  const [responseError, setResponseError] = useState({});
  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/account/disease-history/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).access,
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data.length);
          setState(response.data);
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
      {state.length === 0 ? (
        <Card className="m-2">
          <Card.Body>No user History of diseases found !</Card.Body>
        </Card>
      ) : (
        state.map(({ description, remark }) => (
          <Card className="m-2">
            <Card.Body>{description}</Card.Body>
          </Card>
        ))
      )}
    </>
  );
}

export default History;
