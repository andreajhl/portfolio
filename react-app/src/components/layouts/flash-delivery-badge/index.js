import React from "react";
import { connect } from "react-redux";
import "./styles.scss";

const FlashDeliveryBadgeLayout = ({
  celebrityUsername,
  className,
  color,
  showTime,
  flashDeliveryCelebritiesUsernames
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

const mapStateToProps = ({ celebrities }) => ({
  flashDeliveryCelebritiesUsernames:
    celebrities.fetchFlashDeliveryCelebritiesReducer.data.usernames
});

const _FlashDeliveryBadgeLayout = connect(mapStateToProps)(
  FlashDeliveryBadgeLayout
);

export { _FlashDeliveryBadgeLayout as FlashDeliveryBadgeLayout };
