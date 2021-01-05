import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const getTurnAroundText = (turnAroundTime) => {
  if (turnAroundTime < 1) {
    return "Pocas horas";
  } else if (turnAroundTime === 1) {
    return `${parseInt(turnAroundTime)} día`;
  } else {
    return `${parseInt(turnAroundTime)} días`;
  }
};

const CelebritiesResponseTime = ({ turnAroundTime }) => {
  return (
    <span className="CelebritiesResponseTime">
      Respuesta promedio: <span>{getTurnAroundText(turnAroundTime)}</span>
    </span>
  );
};

CelebritiesResponseTime.propTypes = {
  turnAroundTime: PropTypes.number
};

export { CelebritiesResponseTime };
