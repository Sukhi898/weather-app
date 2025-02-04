import React from "react";

const ErrorHandling = ({ errorMessage }) => {
  return (
    <div style={{ color: "red", fontSize: "16px" }}>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorHandling;
