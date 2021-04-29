import React from "react";
import propTypes from "prop-types";
import Image from "react-bootstrap/Image";
import { CheckIconList } from "../../layouts/check-icon-list";

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
        <CheckIconList
          className="container-subscription-checkout-summary__benefits-list"
          items={[
            "Felicitación en tu cumpleaños.",
            "Descuento en tu próxima compra de video personalizado.",
            "Invitación a sesiones exclusivas en vivo.",
            "Entrada con descuento a eventos.",
            `Acceso a contenido exclusivo de ${celebrityFullName}.`,
            "Participación en sorteos y posibilidad de recibir artículos autografiados.",
            "¡Sorpresas que te harán reír y suspirar!  "
          ]}
        />
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
