import React from "react";
import "./styles.scss";

const HeroSectionLayout = () => {
  return (
    <section className="hero">
      <div className="container hero__container">
        <h1 className="hero__title mb-3">
          Recibe videos personalizados
          <br /> de tus famosos favoritas.
        </h1>
        <ol className="hero__steps p-0">
          <li className="hero__steps-item">
            <img
              className="hero__steps-image"
              src="/assets/img/paper-plain.svg"
              alt="Enviando"
            />
            <p className="hero__steps-text">
              Elige a tu Famoso y solicita el mensaje.
            </p>
          </li>
          <li className="hero__steps-item">
            <img
              className="hero__steps-image"
              src="/assets/img/credit-card-small-white.svg"
              alt="Pagando"
            />
            <p className="hero__steps-text">
              Completa el <br /> proceso de pago.
            </p>
          </li>
          <li className="hero__steps-item">
            <img
              className="hero__steps-image"
              src="/assets/img/play.svg"
              alt="Recibiendo"
            />
            <p className="hero__steps-text">¡Recibe tu video personalizado!</p>
          </li>
        </ol>
      </div>
    </section>
  );
};

export { HeroSectionLayout };
