import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const getTurnAroundText = (turnAroundTime) => {
  if (turnAroundTime < 1) {
    return "Pocas horas";
  } else if (turnAroundTime === 1) {
    return `${turnAroundTime} día`;
  } else {
    return `${turnAroundTime} días`;
  }
};

const CelebritiesResponseTime = ({ turnAroundTime }) => {
  return (
    <span className="CelebritiesResponseTime">
      Respuesta promedio: <br className="CelebritiesResponseTime__line-break" />{" "}
      <span>{getTurnAroundText(parseInt(turnAroundTime))}</span>
    </span>
  );
};

CelebritiesResponseTime.propTypes = {
  turnAroundTime: PropTypes.number
};

export { CelebritiesResponseTime };
