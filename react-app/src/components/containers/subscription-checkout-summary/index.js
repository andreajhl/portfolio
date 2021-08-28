import React from "react";
import propTypes from "prop-types";
import Image from "react-bootstrap/Image";
import { CheckIconList } from "../../layouts/check-icon-list";
import { FormattedMessage } from "react-intl";

const SubscriptionCheckoutSummary = (props) => {
  const { celebrityAvatar, celebrityFullName } = { ...props };
  return (
    <div className="container-subscription-checkout-summary">
      <Image roundedCircle height="210px" src={celebrityAvatar}></Image>
      <section className="container-subscription-checkout-summary__benefits">
        <header className="container-subscription-checkout-summary__benefits-header">
          <img
            src="/assets/img/subscription-star-pink.svg"
            alt="Famosos Backstage"
          />
          <h5>
            <FormattedMessage defaultMessage="Beneficios del Club de Fans" />
          </h5>
        </header>
        <h6 className="container-subscription-checkout-summary__welcome-title">
          <FormattedMessage defaultMessage="¡Bienvenido!" />
        </h6>
        <p className="container-subscription-checkout-summary__copy">
          <FormattedMessage
            defaultMessage="Esta suscripción te permitirá estar más cerca de {celebrityFullName} y conocer todas las novedades de tu famoso favorito antes que los demás."
            values={{ celebrityFullName }}
          />
        </p>
        <CheckIconList
          className="container-subscription-checkout-summary__benefits-list"
          title={
            <FormattedMessage defaultMessage="Disfrutarás de beneficios especiales para súper fans, como:" />
          }
          items={[
            <FormattedMessage defaultMessage="Felicitación en tu cumpleaños." />,
            <FormattedMessage defaultMessage="Descuento en tu próxima compra de video personalizado." />,
            <FormattedMessage defaultMessage="Invitación a sesiones exclusivas en vivo." />,
            <FormattedMessage defaultMessage="Entrada con descuento a eventos." />,
            <FormattedMessage
              defaultMessage="Acceso a contenido exclusivo de {celebrityFullName}."
              values={{ celebrityFullName }}
            />,
            <FormattedMessage defaultMessage="Participación en sorteos y posibilidad de recibir artículos autografiados." />,
            <FormattedMessage defaultMessage="¡Sorpresas que te harán reír y suspirar!" />,
          ]}
        />
      </section>
    </div>
  );
};

// Set propTypes
SubscriptionCheckoutSummary.propTypes = {
  celebrityAvatar: propTypes.string,
  celebrityFullName: propTypes.string,
};

// Set defaultProps
SubscriptionCheckoutSummary.defaultProps = {
  celebrityAvatar: "/assets/img/avatar-blank.png",
  celebrityFullName: "",
};

export default SubscriptionCheckoutSummary;
