import React from "react";
import { Alert } from "react-bootstrap";

export default function ErrorAlert({ errors }) {
  if (!errors || errors.length === 0) return null;

  return (
    <div>
      {errors.map((error, index) => (
        <Alert key={index} variant="danger">
          {error}
        </Alert>
      ))}
    </div>
  );
}