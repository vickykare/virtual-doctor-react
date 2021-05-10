import React from "react";

function PredictDisease({ disease, message }) {
  return (
    <div>
      {disease ? (
        <p className="text-center">
          According to predictions, You have{" "}
          <big className="text-warning">{disease}</big>
        </p>
      ) : null}
      {message ? (
        <p>
          Message:
          <br />
          {message}
        </p>
      ) : null}
    </div>
  );
}

export default PredictDisease;
