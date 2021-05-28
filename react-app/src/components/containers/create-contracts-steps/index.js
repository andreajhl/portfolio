import React from "react";
import { FormattedMessage } from "react-intl";

const CreateContractStepsLayout = () => {
  return (
    <section className="CreateContractsStepsLayout py-4">
      <h2 className="title mb-4 mb-md-3">
        <FormattedMessage defaultMessage="¿Que sucede después de que enviás la solicitud a un Famoso?" />
      </h2>
      <div className="container-CreateContractsStepsLayout mb-0">
        <ul className="CreateContractsStepsLayout__steps-list mb-0">
          <li className="CreateContractsStepsLayout__step-item">
            <div className="CreateContractsStepsLayout__step-icon">
              <img src={"/assets/img/callendar.svg"} alt={"img"} width="26px" />
            </div>
            <div className="CreateContractsStepsLayout__step-text">
              <p>
                <span>
                  <FormattedMessage defaultMessage="Tu solicitud será completada en menos 7 días" />
                </span>
                .
              </p>
            </div>
          </li>

          <li className="CreateContractsStepsLayout__step-item">
            <div className="CreateContractsStepsLayout__step-icon">
              <img
                src={"/assets/img/checked-arrow.svg"}
                alt={"img"}
                width="26px"
              />
            </div>
            <div className="CreateContractsStepsLayout__step-text">
              <p>
                <span>
                  <FormattedMessage defaultMessage="La confirmación de tu compra será enviada a tu mail" />
                </span>
              </p>
            </div>
          </li>

          <li className="CreateContractsStepsLayout__step-item">
            <div className="CreateContractsStepsLayout__step-icon">
              <img
                src={"/assets/img/notification.svg"}
                alt={"img"}
                width="26px"
              />
            </div>
            <div className="CreateContractsStepsLayout__step-text">
              <p>
                <span>
                  <FormattedMessage
                    defaultMessage="Te notificaremos cuando tu video ya esté grabado y disponible
                  para verlo y compartilo"
                  />
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="CreateContractsStepsLayout__safe-money">
        <div className="CreateContractsStepsLayout__safe-money-icon">
          <img src={"/assets/img/cashback.svg"} alt={"img"} width="26px" />
        </div>
        <div className="CreateContractsStepsLayout__safe-money-text">
          <p>
            <span>
              <FormattedMessage
                defaultMessage="Si por alguna razón tu video no pudo ser grabado, te
              reembolsaremos tu dinero en un plazo de 5-7 días aproximadamente"
              />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CreateContractStepsLayout;
