import React from "react";

const Notification = ({ message, isError }) => {
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  };
  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }

  return <div style={isError ? errorStyle : successStyle}>{message}</div>;
};

export default Notification;
