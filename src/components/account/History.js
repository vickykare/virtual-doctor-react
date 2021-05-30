import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
function History() {
  const [state, setState] = useState([]);
  const [responseError, setResponseError] = useState(null);
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
          console.log(response.data);
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
        state.map(({ disease, prescription, created }) => (
          <Card className="m-2">
            <Card.Body>
              <p>{disease}</p>
              {prescription}
              {/* <p className="blockquote-footer text-end pt-3">
                {moment({ created }).startOf("day").fromNow()}
              </p> */}
            </Card.Body>
          </Card>
        ))
      )}
      {responseError && <p className="text-danger">{responseError}</p>}
    </>
  );
}

export default History;
