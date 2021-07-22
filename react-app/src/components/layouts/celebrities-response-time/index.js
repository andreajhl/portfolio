import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

const getTurnAroundText = (turnAroundTime) => {
  if (turnAroundTime < 1) {
    return <FormattedMessage defaultMessage="Pocas horas" />;
  } else if (turnAroundTime === 1) {
    return (
      <FormattedMessage
        defaultMessage="{turnAroundTime} día"
        values={{
          turnAroundTime
        }}
      />
    );
  } else {
    return (
      <FormattedMessage
        defaultMessage="{turnAroundTime} días"
        values={{
          turnAroundTime
        }}
      />
    );
  }
};

const CelebritiesResponseTime = ({
  turnAroundTime,
  availableForFlashDeliveries
}) => {
  return (
    <span className="CelebritiesResponseTime">
      <FormattedMessage defaultMessage="Respuesta promedio:" description="" />{" "}
      <br
        className={`CelebritiesResponseTime__line-break ${
          availableForFlashDeliveries ? "isAvailableForFlashDeliveries" : ""
        }`}
      />{" "}
      <span>
        {availableForFlashDeliveries ? (
          <FormattedMessage
            defaultMessage="Entrega flash (< de 24 hrs)"
            description=""
          />
        ) : (
          getTurnAroundText(parseInt(turnAroundTime))
        )}
      </span>
    </span>
  );
};

CelebritiesResponseTime.propTypes = {
  turnAroundTime: PropTypes.number,
  availableForFlashDeliveries: PropTypes.bool
};

export { CelebritiesResponseTime };
