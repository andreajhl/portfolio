import React, { Component } from "react";
import "./styles.scss";
import { ContractCheckoutSummary } from "../../containers/contract-checkout-summary";
import { AvailablePaymentMethods } from "../../containers/available-payment-methods";
import * as ROUTING_PATHS from "../../../routing/Paths";

class PaymentMethodsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const isLoading = !this.props.contractData.reference;
    return (
      <div
        className='PaymentMethodsSection'
        style={
          isLoading
            ? {
                opacity: "0.3",
                pointerEvents: "none"
              }
            : null
        }
      >
        <div
          className={"row justify-content-center payment-methods-section-row"}
        >
          <div className='col-12 col-md-8 p-0 mx-0 mb-4 mt-2 f-rounded f-shadow'>
            {/* CONTRACT SUMMARY */}
            <div className='col-12 col-md-12 col-lg-8 col-xl-4 mx-auto mt-5'>
              <ContractCheckoutSummary
                celebrityAvatar={this.props.contractData.celebrity_avatar}
                celebrityFullName={this.props.contractData.celebrity_full_name}
                deliveryFrom={this.props.contractData.delivery_from}
                deliveryTo={this.props.contractData.delivery_to}
                instructions={this.props.contractData.instructions}
                price={this.props.contractData.price}
              />
            </div>

            {/* PAYMENT METHODS */}
            <AvailablePaymentMethods
              contractReference={this.props.contractData.reference}
              contractPrice={this.props.contractData.price}
            />

            {/* TERMS */}
            <div className={"p-4 text-center"}>
              <small className={"text-muted text-center"}>
                Al continuar estás aceptando nuestros&nbsp;
                <a href={ROUTING_PATHS.TERMS_PATH} target={"_blank"}>
                  Términos y Condiciones
                </a>
                &nbsp; y nuestra&nbsp;
                <a href={ROUTING_PATHS.POLICIES_PATH} target={"_blank"}>
                  Política de Privacidad
                </a>
                &nbsp;
              </small>
              <div className='mt-2 mx-auto text-center'>
                <img
                  width='230px'
                  src={"/assets/img/pago-seguro.png"}
                  alt={"pago-seguro"}
                />
              </div>
              <br />
            </div>

            {/* HELP */}
            {/*<div className={"mb-4 text-center"}>*/}
            {/*    <small className={"font-weight-light"}>¿Necesitas ayuda?</small>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    );
  }
}

// Set propTypes
PaymentMethodsSection.propTypes = {};

// Set defaultProps
PaymentMethodsSection.defaultProps = {
  contractData: {}
};

// Export Class
export { PaymentMethodsSection };
