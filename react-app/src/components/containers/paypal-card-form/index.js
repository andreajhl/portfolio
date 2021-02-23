import React, { Component } from "react";
import PaypalReactButton from "../paypal-react-button";
import { processPayPalPayment } from "../../../state/ducks/payments/actions";
import * as GTM from "../../../state/utils/gtm";
import { history } from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";

class PayPalCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null
    };
  }

  retry = () => {
    return this.setState({
      ...this.state,
      errorMessage: null
    });
  };

  onPayPalButtonApprove = (orderId, authorizationId) => {
    processPayPalPayment(
      this.props.contractReference,
      orderId,
      authorizationId,
      this.props.discountCouponId
    )
      .then((res) => {
        if (res.status === 10) {
          if (typeof window !== "undefined") {
            if (window.fbq != null) {
              window.fbq("track", "Purchase", {
                value: this.props.contractPrice,
                currency: "USD"
              });
            }
          }
          GTM.tagManagerDataLayer("CONTRACT_PAYED", res.data);
          history._pushRoute(
            ROUTING_PATHS.CLIENT_HIRINGS.replace(
              ":contract_reference",
              res.reference
            )
          );
        } else {
          GTM.tagManagerDataLayer("PENDING_TO_VALIDATE_PAYMENT", res.data);
          history._pushRoute(ROUTING_PATHS.CLIENT_HIRINGS);
        }
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          errorMessage: error
        });
      });
  };

  onPayPalButtonCancel = (orderId) => {
    return this.setState({
      ...this.state,
      errorMessage: "Acción cancelada por el usuario"
    });
  };

  onPayPalButtonError = (error) => {
    return this.setState({
      ...this.state,
      errorMessage: error
    });
  };

  renderButton = () => {
    if (!this.state.errorMessage && this.props.contractPrice > 0) {
      return (
        <PaypalReactButton
          contractReference={this.props.contractReference}
          contractPrice={this.props.contractPrice}
          onPayPalButtonApprove={this.onPayPalButtonApprove}
          onPayPalButtonCancel={this.onPayPalButtonCancel}
          onPayPalButtonError={this.onPayPalButtonError}
        />
      );
    }
  };

  renderError = () => {
    if (this.state.errorMessage) {
      return (
        <div className={"mx-auto p-4 error-container"}>
          <div className="text-danger text-center mb-3">
            <small className={"text-danger font-weight-bold"}>
              {this.state.errorMessage}
            </small>
          </div>
          <div className={"mx-auto text-center mb-3"}>
            <button className={"btn btn-primary"} onClick={this.retry}>
              Volver a intentar
            </button>
          </div>
          <div className="mb-3 text-justify ">
            <small>
              Si el problema persiste puedes comunicarte con nuestro equipo de
              soporte a{" "}
              <a
                className={"font-weight-bold"}
                href="mailto:experiencias@famosos.com"
              >
                experiencias@famosos.com
              </a>{" "}
              para más información.
            </small>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className={""}>
        <ul
          className="mb-4 px-4"
          style={{ fontSize: "15px", listStyle: "none" }}
        >
          <li className="mb-2" style={{ color: "#505050" }}>
            Haz click sobre el siguiente botón para hacer el pago usando tu
            cuenta de PayPal.
          </li>
          <li style={{ color: "#505050" }}>
            Serás redirigido a la pagina oficial de PayPal para continuar con el
            pago.
          </li>
        </ul>
        {this.renderError()}
        {this.renderButton()}
      </div>
    );
  }
}

// defaultProps
PayPalCardForm.defaultProps = {
  contractPrice: null,
  contractReference: ""
};

export { PayPalCardForm };
