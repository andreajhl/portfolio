import React from "react";
import PropTypes from "prop-types";
import { CallToActionButton } from "../call-to-action-button";
import { FormattedMessage } from "react-intl";

const NetworkConnectionErrorLayout = ({ onTryAgain }) => {
  return (
    <div className="NetworkConnectionErrorLayout">
      <section className="NetworkConnectionErrorLayout__section">
        <div className="NetworkConnectionErrorLayout__container mx-auto text-center p-4">
          <img
            width="200px"
            style={{ marginBottom: "0.35rem" }}
            src="/assets/img/wifi-connection-error.svg"
            alt="Error de conexión"
          />
          <br />
          <h3 className="text-center font-weight-bold">
            <FormattedMessage defaultMessage="Ha ocurrido un error" />
          </h3>
          <p className="NetworkConnectionErrorLayout__text">
            <FormattedMessage
              defaultMessage="  Por favor, comprueba tu conexión a <br></br> internet e intenta
            nuevamente."
              values={{
                br: (chunk) => <br></br>
              }}
            />
          </p>
          <CallToActionButton width="200px" onClick={onTryAgain}>
            <FormattedMessage defaultMessage="Reintentar" />
          </CallToActionButton>
        </div>
      </section>
    </div>
  );
};

NetworkConnectionErrorLayout.defaultProps = {
  onTryAgain: () => window.location.reload()
};

NetworkConnectionErrorLayout.propTypes = {
  onTryAgain: PropTypes.func
};

export { NetworkConnectionErrorLayout };
