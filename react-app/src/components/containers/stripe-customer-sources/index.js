import React, { Component } from "react";

import { injectStripe } from "react-stripe-elements";
import { Session } from "../../../state/utils/session";
import { withRouter } from "react-app/src/components/common/routing";
import { processStripePayment } from "../../../state/ducks/payments/actions";
import * as PATHS from "../../../routing/Paths";
import { history } from "../../../routing/History";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { VIDEO_MESSAGE_PRODUCT_ID_PREFIX } from "constants/dynamicAds";
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";

const errorMessages = defineMessages({
  errorMessageApplyStripeAuthWithoutSourceID: {
    defaultMessage: "Debes seleccionar una tarjeta"
  },
  errorMessageApplyStripeAuth: {
    defaultMessage: "Ocurrió un error procesando tu pago."
  }
});
const popupMessages = defineMessages({
  confirmActionQuestion: {
    defaultMessage: "¿Eliminar tarjeta?"
  },
  ApprovedActionMessage: {
    defaultMessage: "Si, eliminar"
  },
  CancelActionMessage: {
    defaultMessage: "No"
  }
});
class StripeCustomerSources extends Component {
  constructor(props) {
    super(props);
    this.session = new Session();
    this.state = {
      selectedSourceId: null
    };
  }

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
              <FormattedMessage defaultMessage="Volver a intentar" />
            </button>
          </div>
          <div className="mb-3 text-justify ">
            <small>
              <FormattedMessage
                defaultMessage="Si el problema persiste puedes comunicarte con nuestro equipo de soporte a <a> experiencias@famosos.com </a> para más información."
                values={{
                  a: (chunks) => (
                    <a
                      className={"font-weight-bold"}
                      href="mailto:experiencias@famosos.com"
                    >
                      {chunks}
                    </a>
                  )
                }}
              />
            </small>
          </div>
        </div>
      );
    }
  };

  updateSelectedSourceId = (e, source) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      selectedSourceId: source.sourceId
    });
  };

  applyStripeAuth = () => {
    if (this.state.selectedSourceId === null) {
      this.setState({
        ...this.state,
        disableButton: false,
        errorMessage: this.props.intl.formatMessage(
          errorMessages.errorMessageApplyStripeAuthWithoutSourceID
        )
      });
    } else {
      this.setState({
        ...this.state,
        disableButton: true,
        errorMessage: null
      });
      processStripePayment(
        this.props.contractReference,
        this.state.selectedSourceId,
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
              errorMessage: this.props.intl.formatMessage(
                errorMessages.errorMessageApplyStripeAuthWithoutSourceID
              )
            });
          }
        });
    }
  };

  removeSource = async (e, index, source) => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h4>
              {this.props.intl.formatMessage(
                popupMessages.confirmActionQuestion
              )}
            </h4>
            <br />
            <button
              className={"btn btn-danger mr-2"}
              onClick={() => {
                this.props.onDeleteSource(index);
                onClose();
              }}
            >
              {this.props.intl.formatMessage(
                popupMessages.ApprovedActionMessage
              )}
            </button>
            <button
              className={"btn mr-2"}
              onClick={() => {
                onClose();
              }}
            >
              {this.props.intl.formatMessage(popupMessages.CancelActionMessage)}
            </button>
          </div>
        );
      }
    });
  };

  renderCards = () => {
    return (
      <div className={"sources-section"}>
        <div className={"mb-3"}>
          <h6>
            <FormattedMessage defaultMessage="Selecciona una tarjeta" />
          </h6>
        </div>
        {this.props.availableSources.map((s, index) => {
          return (
            <div className={"sources-option"} key={"source-id-" + s.sourceId}>
              <div
                className={"source-option-selector"}
                onClick={(e) => this.updateSelectedSourceId(e, s)}
              >
                <div className={"source-brand"}>
                  {s.typeData ? s.typeData.brand : ""}
                </div>
                <div className={"source-number"}>
                  **** **** **** {s.typeData ? s.typeData.last4 : ""}
                </div>
                <div className={"handle-check"}>
                  {this.state.selectedSourceId === s.sourceId ? (
                    <i className={"fa fa-check text-primary"} />
                  ) : (
                    <div />
                  )}
                </div>
              </div>
              <div
                className={"close-div"}
                onClick={(e) => this.removeSource(e, index, s)}
              >
                <i className={"fa fa-trash"} />
              </div>
            </div>
          );
        })}
        <br />
        <div className={"text-center"}>
          {!this.state.errorMessage && (
            <div className={"mx-auto text-center"}>
              <button
                className={"btn btn-primary"}
                onClick={this.applyStripeAuth}
                disabled={this.state.disableButton}
              >
                <FormattedMessage defaultMessage="Pagar" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="StripeCustomerSources">
        {this.renderCards()}
        {this.renderError()}
      </div>
    );
  }
}

// defaultProps
StripeCustomerSources.defaultProps = {
  contractReference: "",
  availableSources: [],
  onDeleteSource: () => {}
};
export default withRouter(injectIntl(injectStripe(StripeCustomerSources)));
