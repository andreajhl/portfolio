import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Session } from "../../../state/utils/session";
import * as PATHS from "../../../routing/Paths";
import { withRouter } from "react-app/src/components/common/routing";
import { processStripePayment } from "../../../state/ducks/payments/actions";
import { history } from "../../../routing/History";
import { VIDEO_MESSAGE_PRODUCT_ID_PREFIX } from "constants/dynamicAds";
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";
import { analytics } from "react-app/src/state/utils/gtm";
import getBuyerIdentityData from "lib/utils/getBuyerIdentityData";

const errorMessages = defineMessages({
  errorMessageOwnerName: {
    defaultMessage:
      "El campo de nombre del titular de la tarjeta es obligatorio",
    description: "Mensaje de error para formulario de stripe",
  },
  errorMessageOwnerEmail: {
    defaultMessage:
      "El campo de correo electrónico del titular de la tarjeta es obligatorio",
    description: "Mensaje de error para formulario de stripe",
  },
  errorMessageCreateStripeSource: {
    defaultMessage: "Ocurrió un error inesperado.",
    description: "Mensaje de error para creación de tarjeta Stripe",
  },
  errorMessageApplyStripeAuth: {
    defaultMessage: "Ocurrió un error procesando tu pago.",
    description: "Mensaje de error para creación de tarjeta Stripe",
  },
});
const placeholders = defineMessages({
  ownerName: {
    defaultMessage: "Escribe aquí el nombre",
  },
  ownerEmail: {
    defaultMessage: "Escribe aquí el correo",
  },
});

class StripeCardForm extends Component {
  constructor(props) {
    super(props);
    this.session = new Session();
    this.state = {
      ownerName: this.session.getSession()?.fullName || "",
      ownerEmail: this.session.getSession()?.email || "",
      errorMessage: null,
      errorType: null,
      errorCode: null,
      disableButton: false,
    };
  }

  handleInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  createStripeSource = () => {
    // CHECK REQUIRED FIELDS
    if (!this.state.ownerName) {
      // ERROR
      return this.setState({
        ...this.state,
        disableButton: false,
        errorMessage: this.props.intl.formatMessage(
          errorMessages.errorMessageOwnerName
        ),
      });
    }
    if (!this.state.ownerEmail) {
      // ERROR
      return this.setState({
        ...this.state,
        disableButton: false,
        errorMessage: this.props.intl.formatMessage(
          errorMessages.errorMessageOwnerEmail
        ),
      });
    }

    // DISABLE BUTTON
    this.setState({
      ...this.state,
      disableButton: true,
    });

    // REQUIRED DATA
    const amount = this.props.contractPrice * 100;
    const currency = "USD";
    const ownerData = {
      name: this.state.ownerName.trim(),
      email: this.state.ownerEmail.trim(),
    };

    analytics.track("SUBMIT_STRIPE_FORM", {
      contractReference: this.props.contractReference,
      discountCouponId: this.props.discountCouponId,
      contractPrice: this.props.contractPrice,
      celebrityId: this.props.celebrityId,
      widget: "StripeCardForm",
    });

    // CREATE A SOURCE CARD
    this.props.stripe
      .createSource({
        type: "card",
        currency: currency,
        owner: ownerData,
        usage: "reusable",
      })
      .then((response) => {
        // ERROR
        if (response.error) {
          // ERROR
          return this.setState({
            ...this.state,
            disableButton: false,
            errorMessage: response.error.message,
            errorType: response.error?.type,
            errorCode: response.error?.code,
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
            response.source.id,
            ownerData,
            amount
          );
        } else {
          this.setState({
            ...this.state,
            errorMessage: this.props.intl.formatMessage(
              errorMessages.errorMessageCreateStripeSource
            ),
          });
        }
      });
  };

  applyStripeAuth = async (sourceId) => {
    const {
      deviceId,
      IP,
      userAgent,
      geoLocalization,
    } = await getBuyerIdentityData();
    processStripePayment(
      this.props.contractReference,
      sourceId,
      this.props.discountCouponId,
      deviceId,
      IP,
      userAgent,
      geoLocalization,
      this.props.intl.locale
    )
      .then((res) => {
        if (res.data.status === "ERROR") {
          this.setState({
            ...this.state,
            errorMessage: res.data.error,
          });
        } else {
          analytics.trackContractPurchase({
            celebrityId: this.props.celebrityId,
            contractPrice: this.props.contractPrice,
          });
          analytics.track("CONTRACT_PAYED", {
            widget: "StripeCardForm",
            paymentMethod: "STRIPE",
            contractReference: this.props.contractReference,
            discountCouponId: this.props.discountCouponId,
            contractPrice: this.props.contractPrice,
            celebrityId: this.props.celebrityId,
          });
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
              errorMessage: error.response.data.error,
            });
          }
        } else {
          this.setState({
            ...this.state,
            errorMessage: this.props.intl.formatMessage(
              errorMessages.errorMessageApplyStripeAuth
            ),
          });
        }
      });
  };

  createStripe3DFlow = (currency, sourceId, ownerData, amount) => {
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

    analytics.track("START_3D_SECURE_FLOW", {
      contractReference: this.props.contractReference,
      discountCouponId: this.props.discountCouponId,
      contractPrice: this.props.contractPrice,
      celebrityId: this.props.celebrityId,
      widget: "StripeCardForm",
    });

    // CREATE A 3D SOURCE
    this.props.stripe
      .createSource({
        type: "three_d_secure",
        currency: currency,
        amount: amount,
        three_d_secure: { card: sourceId },
        redirect: { return_url: responseURL },
        owner: ownerData,
      })
      .then((response) => {
        // ERROR
        if (response.error) {
          return this.setState({
            ...this.state,
            disableButton: false,
            errorMessage: response.error?.message,
            errorType: response.error?.type,
          });
        }

        // GO TO IFRAME
        this.props.history.push({
          pathname: iframeUrl,
          query: { url: response.source.redirect.url },
        });
      });
  };

  retry = () => {
    return this.setState({
      ...this.state,
      disableButton: false,
      errorMessage: null,
      errorCode: null,
      errorType: null,
    });
  };

  renderError = () => {
    if (this.state.errorMessage) {
      return (
        <div className={"mx-auto p-4 error-container"}>
          <div className="text-danger text-center mb-3">
            <small className={"text-danger font-weight-bold"}>
              {this.state.errorMessage} <br />
              {this.state.errorCode ? this.state.errorCode : null} <br />
              {this.state.errorType ? this.state.errorType : null} <br />
            </small>
          </div>
          <div className={"mx-auto text-center mb-3"}>
            <button className={"btn btn-primary"} onClick={this.retry}>
              <FormattedMessage defaultMessage="Volver a intentar" />
            </button>
          </div>
          <div className="mb-3 text-justify ">
            <small>
              <FormattedMessage
                defaultMessage=" Si el problema persiste puedes comunicarte con nuestro equipo de
              soporte a
              <a>experiencias@famosos.com</a> para más información."
                values={{
                  a: (chunks) => (
                    <a
                      className={"font-weight-bold"}
                      href="mailto:experiencias@famosos.com"
                    >
                      {chunks}
                    </a>
                  ),
                }}
              />
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
            <FormattedMessage defaultMessage="Correo del titular de la tarjeta" />
          </h6>
          <input
            autoComplete="off"
            type="text"
            className="form-control mb-3 input-stripe-form"
            placeholder={this.props.intl.formatMessage(placeholders.ownerEmail)}
            name="ownerEmail"
            onChange={this.handleInput || ""}
            value={this.state.ownerEmail}
          />
          <h6 className={"font-weight-light label-stripe-form"}>
            <FormattedMessage defaultMessage="Nombre del titular de la tarjeta" />
          </h6>
          <input
            type="text"
            autoComplete="off"
            className="form-control mb-3 input-stripe-form"
            placeholder={this.props.intl.formatMessage(placeholders.ownerName)}
            name="ownerName"
            onChange={this.handleInput || ""}
            value={this.state.ownerName}
          />
          <h6 className={"font-weight-light label-stripe-form"}>
            <FormattedMessage defaultMessage="Datos de la tarjeta" />
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
              <FormattedMessage
                defaultMessage="Ten en cuenta: CVC = Código en el reverso de la tarjeta, CP/ZIP =
              Código postal"
              />
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
                <span>
                  <FormattedMessage defaultMessage="Pagar" />
                </span>
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
  contractPrice: 0,
};
export default withRouter(injectIntl(injectStripe(StripeCardForm)));
