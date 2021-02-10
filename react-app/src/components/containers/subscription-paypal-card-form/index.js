import React, { Component } from "react";
import SubscriptionPaypalReactButton from "../subscription-paypal-react-button";
import { postProcessSubscription } from "../../../state/ducks/subscriptions/actions";
import { withRouter } from "react-app/src/components/common/routing";
import * as GTM from "../../../state/utils/gtm";
import * as ROUTING_PATHS from "../../../routing/Paths";
import { connect } from "react-redux";

class SubscriptionPayPalCardForm extends Component {
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

  onPayPalButtonApprove = (data) => {
    data.planID = this.props.planId;
    postProcessSubscription(data)
      .then((res) => {
        this.props.history.push(
          ROUTING_PATHS.SUBSCRIPTION_SUCCESS.replace(
            ":celebrity_username",
            this.props.match.params.celebrity_username
          )
        );
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
        <div className={"mb-4"} style={{ fontSize: "15px" }}>
          <li>
            Haz click sobre el siguiente botón para hacer el pago usando tu
            cuenta de PayPal.
          </li>
          <li>
            Serás redirigido a la pagina oficial de PayPal para continuar con el
            pago.
          </li>
        </div>
        {this.renderError()}
        {!this.state.errorMessage && this.props.planId.length > 0 ? (
          <SubscriptionPaypalReactButton
            planId={this.props.planId}
            onPayPalButtonApprove={this.onPayPalButtonApprove}
            onPayPalButtonCancel={this.onPayPalButtonCancel}
            onPayPalButtonError={this.onPayPalButtonError}
          />
        ) : null}
      </div>
    );
  }
}

// defaultProps
SubscriptionPayPalCardForm.defaultProps = {
  planId: ""
};

// mapStateToProps
// const mapDispatchToProps = {
// };

const _SubscriptionPayPalCardForm = connect(
  null,
  null
)(withRouter(SubscriptionPayPalCardForm));

export { _SubscriptionPayPalCardForm as SubscriptionPayPalCardForm };
