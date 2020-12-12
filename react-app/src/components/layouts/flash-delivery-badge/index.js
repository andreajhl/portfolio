import React from "react";
import "./styles.scss";

const FlashDeliveryBadgeLayout = ({ className }) => (
  <span className={`FlashDeliveryLayout ${className ? className : ""}`}>
    <span className="FlashDeliveryLayout__title">Entrega Flash</span>
    <i className="FlashDeliveryLayout__icon fa fa-bolt text-warning" />
  </span>
);

export { FlashDeliveryBadgeLayout };
