import React from "react";
import { Alert } from "react-bootstrap";

export function MostrarAlert({ messages, type = "danger" }) {
  if (!messages || messages.length === 0) return null;

  return (
    <div>
      {messages.map((message, index) => (
        <Alert key={index} variant={type}>
          {message}
        </Alert>
      ))}
    </div>
  );
}