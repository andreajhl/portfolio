import React from "react";
import "./styles.scss";

const HowToGetAVideoMessageLayout = () => {
  return (
    <section className="HowToGetAVideoMessageLayout py-4">
      <div className="container mb-0">
        <h2 className="HowToGetAVideoMessageLayout__title mb-4 mb-md-5">
          ¿Comó solicitar <br /> un videomensaje?
        </h2>
        <ul className="HowToGetAVideoMessageLayout__steps-list container mb-0">
          <li className="HowToGetAVideoMessageLayout__step-item">
            <img
              src="assets/img/tap.svg"
              className="HowToGetAVideoMessageLayout__step-icon mb-3"
            />
            <p className="HowToGetAVideoMessageLayout__step-text">
              Da clic <br className="d-md-none" /> en{" "}
              <br className="d-none d-md-inline" /> el botón{" "}
              <br className="d-md-none" /> de arriba.
            </p>
          </li>
          <li className="HowToGetAVideoMessageLayout__step-item">
            <img
              src="assets/img/paper-plain-pink.svg"
              className="HowToGetAVideoMessageLayout__step-icon mb-3"
            />
            <p className="HowToGetAVideoMessageLayout__step-text">
              Detalla la solicitud y{" "}
              <br className="d-none d-sm-inline d-md-none" /> realiza el proceso
              <br className="d-none d-sm-inline d-md-none" />
              de compra.
            </p>
          </li>
          <li className="HowToGetAVideoMessageLayout__step-item">
            <img
              src="assets/img/smile.svg"
              className="HowToGetAVideoMessageLayout__step-icon mb-3"
            />
            <p className="HowToGetAVideoMessageLayout__step-text">
              ¡Y listo! <br className="d-none d-sm-inline d-md-none" /> en poco
              tiempo recibirás tu videomensaje.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HowToGetAVideoMessageLayout;
