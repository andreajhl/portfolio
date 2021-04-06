import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

const FlashDeliveryBadgeLayout = ({
  className,
  color,
  showTitle,
  showTime
}) => {
  return (
    <span
      className={`FlashDeliveryLayout ${className} ${
        showTitle || showTime ? "" : "FlashDeliveryLayout--without-text"
      } FlashDeliveryLayout--color-${color}`}
    >
      {showTitle ? (
        <span className="FlashDeliveryLayout__title">
          <FormattedMessage defaultMessage="Entrega Flash" />
        </span>
      ) : null}
      {showTime ? (
        <span className="FlashDeliveryLayout__time">24 hrs.</span>
      ) : null}
      <i className="FlashDeliveryLayout__icon fa fa-bolt text-warning" />
    </span>
  );
};

FlashDeliveryBadgeLayout.defaultProps = {
  className: "",
  color: "white",
  showTime: false,
  showTitle: false
};

FlashDeliveryBadgeLayout.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  showTime: PropTypes.bool,
  showTitle: PropTypes.bool
};

export { FlashDeliveryBadgeLayout };
