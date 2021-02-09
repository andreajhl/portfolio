import React from "react";
import PropTypes from "prop-types";

const getTurnAroundText = (turnAroundTime) => {
  if (turnAroundTime < 1) {
    return "Pocas horas";
  } else if (turnAroundTime === 1) {
    return `${turnAroundTime} día`;
  } else {
    return `${turnAroundTime} días`;
  }
};

const CelebritiesResponseTime = ({
  turnAroundTime,
  availableForFlashDeliveries
}) => {
  return (
    <span className="CelebritiesResponseTime">
      Respuesta promedio:{" "}
      <br
        className={`CelebritiesResponseTime__line-break ${
          availableForFlashDeliveries ? "isAvailableForFlashDeliveries" : ""
        }`}
      />{" "}
      <span>
        {availableForFlashDeliveries
          ? "Entrega flash (< de 24 hrs)"
          : getTurnAroundText(parseInt(turnAroundTime))}
      </span>
    </span>
  );
};

CelebritiesResponseTime.propTypes = {
  turnAroundTime: PropTypes.number,
  availableForFlashDeliveries: PropTypes.bool
};

export { CelebritiesResponseTime };
