import React from "react";
import { flashDeliveryCelebritiesUsernames } from "../../../constants/flashDeliveryCelebritiesUsernames";
import "./styles.scss";

const FlashDeliveryBadgeLayout = ({
  celebrityUsername,
  className,
  color,
  showTime
}) => {
  const celebrityIsFlashDelivery = flashDeliveryCelebritiesUsernames.find(
    (username) => username === celebrityUsername
  );
  return celebrityIsFlashDelivery ? (
    <span
      className={`FlashDeliveryLayout ${
        className ? className : ""
      } FlashDeliveryLayout-color-${color ? color : "white"}`}
    >
      <span className="FlashDeliveryLayout__title">Entrega Flash</span>
      {showTime ? (
        <span className="FlashDeliveryLayout__time">24 hrs.</span>
      ) : null}
      <i className="FlashDeliveryLayout__icon fa fa-bolt text-warning" />
    </span>
  ) : null;
};

export { FlashDeliveryBadgeLayout };
