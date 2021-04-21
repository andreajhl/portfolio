import React, { Component } from "react";
import { Form } from "react-bootstrap";

import { CardElement, injectStripe } from "react-stripe-elements";
import { Session } from "../../../state/utils/session";
import * as PATHS from "../../../routing/Paths";
import { withRouter } from "react-app/src/components/common/routing";
import { processStripePayment } from "../../../state/ducks/payments/actions";
import { history } from "../../../routing/History";
import { VIDEO_MESSAGE_PRODUCT_ID_PREFIX } from "constants/dynamicAds";

class StripeCardForm extends Component {
  constructor(props) {
    super(props);
    this.session = new Session();
    this.state = {
      ownerName: this.session.getSession()?.fullName || "",
      ownerEmail: this.session.getSession()?.email || "",
      errorMessage: null,
      disableButton: false
    };
  }

  handleInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  createStripeSource = () => {
    // CHECK REQUIRED FIELDS
    if (!this.state.ownerName) {
      // ERROR
      return this.setState({
        ...this.state,
        disableButton: false,
        errorMessage:
          "El campo de nombre del titular de la tarjeta es obligatorio"
      });
    }
    if (!this.state.ownerEmail) {
      // ERROR
      return this.setState({
        ...this.state,
        disableButton: false,
        errorMessage:
          "El campo de correo electrónico del titular de la tarjeta es obligatorio"
      });
    }

    // DISABLE BUTTON
    this.setState({
      ...this.state,
      disableButton: true
    });

    // REQUIRED DATA
    const amount = this.props.contractPrice * 100;
    const currency = "USD";
    const ownerData = {
      name: this.state.ownerName.trim(),
      email: this.state.ownerEmail.trim()
    };

    // CREATE A SOURCE CARD
    this.props.stripe
      .createSource({
        type: "card",
        currency: currency,
        amount: amount,
        owner: ownerData,
        usage: "reusable"
      })
      .then((response) => {
        console.log("response.source", response.source);

        // ERROR
        if (response.error) {
          // ERROR
          return this.setState({
            ...this.state,
            disableButton: false,
            errorMessage: response.error.message
          });
        }
        // SEND TO THE BACKEND TO LINKED WITH THE CUSTOMER AND APPLY THE AUTHORIZATION
        else if (
          response.source.status === "chargeable" &&
          response.source.card.three_d_secure === "optional"
        ) {
          this.applyStripeAuth(response.source.id);
        }
        // APPLY 3D FLOW
        else if (
          response.source.card.three_d_secure === "optional" ||
          response.source.card.three_d_secure === "required" ||
          response.source.card.three_d_secure === "recommended"
        ) {
          this.createStripe3DFlow(
            currency,
            amount,
            response.source.id,
            ownerData
          );
        } else {
          this.setState({
            ...this.state,
            errorMessage: "Ocurrió un error inesperado."
          });
        }
      });
  };

  applyStripeAuth = (sourceId) => {
    processStripePayment(
      this.props.contractReference,
      sourceId,
      this.props.discountCouponId
    )
      .then((res) => {
        if (res.data.status === "ERROR") {
          this.setState({
            ...this.state,
            errorMessage: res.data.error
          });
        } else {
          if (typeof window !== "undefined") {
            if (window.fbq != null) {
              window.fbq("track", "Purchase", {
                content_type: "product",
                content_ids:
                  VIDEO_MESSAGE_PRODUCT_ID_PREFIX + this.props.celebrityId,
                value: this.props.contractPrice,
                currency: "USD"
              });
            }
          }
          const route = PATHS.PURCHASE_SUMMARY.replace(
            ":contract_reference",
            res.data.data.reference
          );
          history._pushRoute(route);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data) {
            this.setState({
              ...this.state,
              errorMessage: error.response.data.error
            });
          }
        } else {
          this.setState({
            ...this.state,
            errorMessage: "Ocurrió un error procesando tu pago,"
          });
        }
      });
  };

  createStripe3DFlow = (currency, amount, sourceId, ownerData) => {
    const iframeUrl = PATHS.STRIPE_3D_SECURE_IFRAME.replace(
      ":contract_reference",
      this.props.contractReference
    );
    const responseURL =
      window.location.origin +
      PATHS.STRIPE_3D_SECURE_RESPONSE.replace(
        ":contract_reference",
        this.props.contractReference
      );

    // CREATE A 3D SOURCE
    this.props.stripe
      .createSource({
        type: "three_d_secure",
        currency: currency,
        amount: amount,
        three_d_secure: { card: sourceId },
        redirect: { return_url: responseURL },
        owner: ownerData
      })
      .then((response) => {
        // ERROR
        if (response.error) {
          return this.setState({
            ...this.state,
            disableButton: false,
            errorMessage: response.error.message
          });
        }

        // GO TO IFRAME
        this.props.history.push({
          pathname: iframeUrl,
          query: { url: response.source.redirect.url }
        });
      });
  };

  retry = () => {
    return this.setState({
      ...this.state,
      disableButton: false,
      errorMessage: null
    });
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
      <div className="StripeCardForm">
        <Form.Group>
          <h6 className={"font-weight-light label-stripe-form"}>
            Correo del titular de la tarjeta
          </h6>
          <input
            type="text"
            className="form-control mb-3 input-stripe-form"
            placeholder="Escribe aquí el correo"
            name="ownerEmail"
            onChange={this.handleInput || ""}
            value={this.state.ownerEmail}
          />
          <h6 className={"font-weight-light label-stripe-form"}>
            Nombre del titular de la tarjeta
          </h6>
          <input
            type="text"
            className="form-control mb-3 input-stripe-form"
            placeholder="Escribe aquí el nombre"
            name="ownerName"
            onChange={this.handleInput || ""}
            value={this.state.ownerName}
          />
          <h6 className={"font-weight-light label-stripe-form"}>
            Datos de la tarjeta
          </h6>
          <div
            className="StripeCardElementLayout"
            style={{ border: "solid 2px !important" }}
          >
            <div className="checkout">
              <CardElement />
            </div>
          </div>
          <div className={"text-center mt-2 pb-2"}>
            <div className={"font-weight-light"} style={{ fontSize: "10px" }}>
              Ten en cuenta: CVC = Código en el reverso de la tarjeta, CP/ZIP =
              Código postal
            </div>
          </div>
          {this.renderError()}
          {!this.state.errorMessage && (
            <div className={"mx-auto text-center"}>
              <button
                className={"btn btn-primary button-process-with-stripe"}
                onClick={this.createStripeSource}
                disabled={this.state.disableButton}
              >
                <span>Pagar</span>
              </button>
            </div>
          )}
        </Form.Group>
      </div>
    );
  }
}

// defaultProps
StripeCardForm.defaultProps = {
  contractReference: "",
  contractPrice: 0
};
export default withRouter(injectStripe(StripeCardForm));
