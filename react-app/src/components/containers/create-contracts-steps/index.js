import React from "react";
import "./styles.scss";

const CreateContractStepsLayout = () => {
  return (
    <section className='CreateContractsStepsLayout py-4'>
      <div className='container mb-0'>
        <h2 className='container__title mb-4 mb-md-3'>
          ¿Que sucede después de que enviás la solicitud a un Famoso?
        </h2>

        <ul className='CreateContractsStepsLayout__steps-list container mb-0'>
          <li className='CreateContractsStepsLayout__step-item'>
            <div className='CreateContractsStepsLayout__step-icon'>
              <i className='fa fa-calendar-alt' />
            </div>
            <div className='CreateContractsStepsLayout__step-text'>
              <p>
                <span>Tu solicitud será completada en menos 7 días</span>.
              </p>
            </div>
          </li>

          <li className='CreateContractsStepsLayout__step-item'>
            <div className='CreateContractsStepsLayout__step-icon'>
              <i className='fa fa-check-circle' />
            </div>
            <div className='CreateContractsStepsLayout__step-text'>
              <p>
                <span>La confirmación de tu compra será enviada a tu mail</span>
              </p>
            </div>
          </li>

          <li className='CreateContractsStepsLayout__step-item'>
            <div className='CreateContractsStepsLayout__step-icon'>
              <i className='fa fa-envelope' />
            </div>
            <div className='CreateContractsStepsLayout__step-text'>
              <p>
                <span>
                  Te notificaremos cuando tu video ya esté grabado y disponible
                  para verlo y compartilo
                </span>
              </p>
            </div>
          </li>

          <li className='CreateContractsStepsLayout__step-item'>
            <div className='CreateContractsStepsLayout__step-icon'>
              <i className='fa fa-hand-holding-usd' />
            </div>
            <div className='CreateContractsStepsLayout__step-text'>
              <p>
                <span>
                  Si por alguna razón tu video no pudo ser grabado, te
                  reembolsaremos tu dinero en un plazo de 5-7 días
                  aproximadamente
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CreateContractStepsLayout;
