import React from "react";
import propTypes from "prop-types";
import "./styles.scss";
import Image from "react-bootstrap/Image";

const SubscriptionCheckoutSummary = (props) => {
  const { celebrityAvatar, celebrityFullName } = { ...props };
  return (
    <div className="container-subscription-checkout-summary">
      <Image roundedCircle height="100px" src={celebrityAvatar}></Image>
      <h5 className="container-subscription-checkout-summary__celebrity-name">
        {celebrityFullName}
      </h5>
      <div className="container-subscription-checkout-summary__benefits">
        <h5>Beneficios de la suscripción</h5>
        <ul className="container-subscription-checkout-summary__benefits-list">
          <li>
            <i className="fas fa-check"></i>
            <span>
              Descuento en compras de videomensajes de {celebrityFullName}.
            </span>
          </li>
          <li>
            <i className="fas fa-check"></i>
            <span>
              Invitación a eventos gratuitos y pagos con {celebrityFullName}.
            </span>
          </li>
          <li>
            <i className="fas fa-check"></i>
            <span>Acceso a contenido inédito.</span>
          </li>
          <li>
            <i className="fas fa-check"></i>
            <span>Muchas Sorpresas!</span>
          </li>
        </ul>
        <span>
          Recuerda que este precio precio es por una suscripción mensual y se
          renovara automática cada mes
        </span>
      </div>
    </div>
  );
};

// Set propTypes
SubscriptionCheckoutSummary.propTypes = {
  celebrityAvatar: propTypes.string,
  celebrityFullName: propTypes.string
};

// Set defaultProps
SubscriptionCheckoutSummary.defaultProps = {
  celebrityAvatar: "/assets/img/avatar-blank.png",
  celebrityFullName: ""
};

export default SubscriptionCheckoutSummary;
