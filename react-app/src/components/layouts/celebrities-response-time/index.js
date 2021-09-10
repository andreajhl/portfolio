import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { FlashDeliveryAdvertise } from "../../celebrity-profile/flash-delivery-advertise";

function getTurnAroundText(turnAroundTime) {
  if (turnAroundTime < 1) {
    return <FormattedMessage defaultMessage="Pocas horas" />;
  } else if (turnAroundTime === 1) {
    return (
      <FormattedMessage
        defaultMessage="{turnAroundTime} día"
        values={{ turnAroundTime }}
      />
    );
  } else {
    return (
      <FormattedMessage
        defaultMessage="{turnAroundTime} días"
        values={{ turnAroundTime }}
      />
    );
  }
}

function CelebritiesResponseTime({
  turnAroundTime,
  availableForFlashDeliveries,
}) {
  if (availableForFlashDeliveries)
    return (
      <FlashDeliveryAdvertise className="CelebritiesResponseTime__flash-delivery" />
    );

  return (
    <span className="CelebritiesResponseTime">
      <FormattedMessage defaultMessage="Respuesta promedio:" description="" />{" "}
      <br className="CelebritiesResponseTime__line-break" />{" "}
      <span>{getTurnAroundText(Math.round(turnAroundTime ?? 2))}</span>
    </span>
  );
}

CelebritiesResponseTime.propTypes = {
  turnAroundTime: PropTypes.number,
  availableForFlashDeliveries: PropTypes.bool,
};

export { CelebritiesResponseTime };
