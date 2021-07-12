import React from "react";
import { FormattedMessage } from "react-intl";

function HeroSectionLayout() {
  return (
    <section className="hero">
      <div className="container hero__container">
        <h1 className="hero__title mb-3">
          <FormattedMessage defaultMessage="Recibe Videomensajes Personalizados de Famosos a tu WhatsApp" />
        </h1>
        <ol className="hero__steps p-0">
          <li className="hero__steps-item">
            <img
              className="hero__steps-image"
              src="/assets/img/paper-plain-pink.svg"
              alt="Enviando"
            />
            <p className="hero__steps-text">
              <FormattedMessage
                defaultMessage="Elige a tu Famoso y solicita el mensaje."
                description=""
              />
            </p>
          </li>
          <li className="hero__steps-item">
            <img
              className="hero__steps-image"
              src="/assets/img/credit-card-small-pink.svg"
              alt="Pagando"
            />
            <p className="hero__steps-text">
              <FormattedMessage
                defaultMessage="Completa el <br></br> proceso de pago."
                description=""
                values={{
                  br: (chunks) => <br></br>,
                }}
              />
            </p>
          </li>
          <li className="hero__steps-item">
            <img
              className="hero__steps-image"
              src="/assets/img/play-pink.svg"
              alt="Recibiendo"
            />
            <p className="hero__steps-text">
              <FormattedMessage
                defaultMessage="¡Recibe tu video personalizado!"
                description=""
              />
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}

export { HeroSectionLayout };
