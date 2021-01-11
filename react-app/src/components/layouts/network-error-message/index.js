import React from "react";
import { CallToActionButton } from "../call-to-action-button";
import "./styles.scss";

const NetworkConnectionErrorLayout = (props) => {
  return (
    <div className="NetworkConnectionErrorLayout">
      <section className="NetworkConnectionErrorLayout__section">
        <div className="NetworkConnectionErrorLayout__container mx-auto text-center p-4">
          <img
            width="200px"
            style={{ opacity: "0.2", marginBottom: "0.35rem" }}
            src="/assets/img/wifi-connection-error.png"
            alt="Error de conexión"
          />
          <br />
          <h3 className="text-center">Ha ocurrido un error</h3>
          <p className="NetworkConnectionErrorLayout__text">
            Por favor, comprueba tu conexión a <br /> internet e intenta
            nuevamente.
          </p>
          <CallToActionButton
            width="200px"
            onClick={() => window.location.reload()}
            className="text-uppercase"
          >
            Reintentar
          </CallToActionButton>
        </div>
      </section>
    </div>
  );
};

export { NetworkConnectionErrorLayout };
