import React from "react";
import "./styles.scss";

const HowToGetAVideoMessageLayout = () => {
  return (
    <section className="HowToGetAVideoMessageLayout">
      <div className="container">
        <div className="container">
          <h2 className="HowToGetAVideoMessageLayout__title mb-4">
            ¿Comó solicitar <br /> un videomensaje?
          </h2>
          <ul className="HowToGetAVideoMessageLayout__steps-list">
            <li className="HowToGetAVideoMessageLayout__step-item">
              <img src="assets/img/paper-plain-pink.svg" className="mb-3" />
              <p className="HowToGetAVideoMessageLayout__step-text">
                Da clic <br /> en el botón <br /> de arriba.
              </p>
            </li>
            <li className="HowToGetAVideoMessageLayout__step-item">
              <img src="assets/img/paper-plain-pink.svg" className="mb-3" />
              <p className="HowToGetAVideoMessageLayout__step-text">
                Detalla la solicitud y realiza el proceso de compra.
              </p>
            </li>
            <li className="HowToGetAVideoMessageLayout__step-item">
              <img src="assets/img/paper-plain-pink.svg" className="mb-3" />
              <p className="HowToGetAVideoMessageLayout__step-text">
                ¡Y listo! en poco tiempo recibirás tu videomensaje.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowToGetAVideoMessageLayout;
