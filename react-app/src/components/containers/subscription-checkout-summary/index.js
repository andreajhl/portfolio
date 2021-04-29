import React from "react";
import propTypes from "prop-types";

import Image from "react-bootstrap/Image";

const SubscriptionCheckoutSummary = (props) => {
  const { celebrityAvatar, celebrityFullName } = { ...props };
  return (
    <div className="container-subscription-checkout-summary">
      <Image roundedCircle height="210px" src={celebrityAvatar}></Image>
      <section className="container-subscription-checkout-summary__benefits">
        <header className="container-subscription-checkout-summary__benefits-header">
          <img
            src="/assets/img/subscription-star-pink.svg"
            alt="Estrella de Club de Fans"
          />
          <h5>Beneficios del Club de Fans</h5>
        </header>
        <ul className="container-subscription-checkout-summary__benefits-list">
          <li>
            <i className="fas fa-check-circle"></i>
            <span>
              Descuento en compras de videomensajes de {celebrityFullName}.
            </span>
          </li>
          <li>
            <i className="fas fa-check-circle"></i>
            <span>
              Invitación a eventos premium y gratuitos con {celebrityFullName}.
            </span>
          </li>
          <li>
            <i className="fas fa-check-circle"></i>
            <span>Acceso a contenido inédito.</span>
          </li>
          <li>
            <i className="fas fa-check-circle"></i>
            <span>¡Muchas sorpresas más!</span>
          </li>
        </ul>
      </section>
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
