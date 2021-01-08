import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const FlashDeliveryBadgeLayout = ({ className, color, showTime }) => {
  return (
    <span
      className={`FlashDeliveryLayout ${className} FlashDeliveryLayout-color-${color}`}
    >
      <span className="FlashDeliveryLayout__title">Entrega Flash</span>
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
  showTime: false
};

FlashDeliveryBadgeLayout.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  showTime: PropTypes.bool
};

export { FlashDeliveryBadgeLayout };
