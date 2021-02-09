import React from "react";

const HeroSectionLayout = () => {
  return (
    <section className="hero">
      <div className="container hero__container">
        <h1 className="hero__title mb-3">
          Videos Personalizados
          <br />
          de tus Famosos Favoritos
        </h1>
        <ol className="hero__steps p-0">
          <li className="hero__steps-item">
            <img
              className="hero__steps-image"
              src="/assets/img/paper-plain-pink.svg"
              alt="Enviando"
            />
            <p className="hero__steps-text">
              Elige a tu Famoso y solicita el mensaje.
            </p>
          </li>
          <li className="hero__steps-item">
            <img
              className="hero__steps-image"
              src="/assets/img/credit-card-small-pink.svg"
              alt="Pagando"
            />
            <p className="hero__steps-text">
              Completa el <br /> proceso de pago.
            </p>
          </li>
          <li className="hero__steps-item">
            <img
              className="hero__steps-image"
              src="/assets/img/play-pink.svg"
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
