import React, { Component } from "react";
import { processPayPalPayment } from "../../../state/ducks/payments/actions";
import * as GTM from "../../../state/utils/gtm";
import { history } from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";
import { VIDEO_MESSAGE_PRODUCT_ID_PREFIX } from "constants/dynamicAds";
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalReactButton from "desktop-app/components/payments-methods/paypal-react-button";
import getBuyerIdentityData from "lib/utils/getBuyerIdentityData";

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_KEY;

const errorMessages = defineMessages({
  errorMessageOnPayPalButtonCancel: {
    defaultMessage: "Acción cancelada por el usuario",
  },
});

class PayPalCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
    };
  }

  retry = () => {
    return this.setState({
      ...this.state,
      errorMessage: null,
    });
  };

  onPayPalButtonApprove = async (orderId, authorizationId) => {
    const {
      deviceId,
      IP,
      userAgent,
      geoLocalization,
    } = await getBuyerIdentityData();

    processPayPalPayment(
      this.props.contractReference,
      orderId,
      authorizationId,
      this.props.discountCouponId,
      deviceId,
      IP,
      userAgent,
      geoLocalization,
      this.props.intl.locale
    )
      .then((res) => {
        if (res.status === 10) {
          GTM.trackContractPurchase({
            celebrityId: this.props.celebrityId,
            contractPrice: this.props.contractPrice,
          });
          const analyticsData = {
            ...res?.data,
            widget: "PaypalCardForm",
            paymentMethod: "PAYPAL",
            contractReference: this.props.contractReference,
            discountCouponId: this.props.discountCouponId,
            contractPrice: this.props.contractPrice,
            celebrityId: this.props.celebrityId,
          };
          GTM.tagManagerDataLayer("CONTRACT_PAYED", analyticsData);
          history._pushRoute(
            ROUTING_PATHS.PURCHASE_SUMMARY.replace(
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
          errorMessage: error,
        });
      });
  };

  onPayPalButtonCancel = (orderId) => {
    return this.setState({
      ...this.state,
      errorMessage: this.props.intl.formatMessage(
        errorMessages.errorMessageOnPayPalButtonCancel
      ),
    });
  };

  onPayPalButtonError = (error) => {
    return this.setState({
      ...this.state,
      errorMessage: String(error),
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
      <PayPalScriptProvider
        options={{
          intent: "authorize",
          "client-id": CLIENT_ID,
          currency: "USD",
          "disable-funding": "credit,card",
        }}
      >
        <div className={""}>
          <ul
            className="mb-4 px-4"
            style={{ fontSize: "15px", listStyle: "none" }}
          >
            <li className="mb-2" style={{ color: "#505050" }}>
              <FormattedMessage
                defaultMessage=" Haz click sobre el siguiente botón para hacer el pago usando tu
            cuenta de PayPal."
              />
            </li>
            <li style={{ color: "#505050" }}>
              <FormattedMessage
                defaultMessage="Serás redirigido a la pagina oficial de PayPal para continuar con el
            pago."
              />
            </li>
          </ul>
          {this.renderError()}
          {this.renderButton()}
        </div>
      </PayPalScriptProvider>
    );
  }
}

// defaultProps
PayPalCardForm.defaultProps = {
  contractPrice: null,
  contractReference: "",
};

const _PaypalCardForm = injectIntl(PayPalCardForm);

export { _PaypalCardForm as PayPalCardForm };
