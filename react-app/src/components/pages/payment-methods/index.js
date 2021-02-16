import React, { Component } from "react";
import { PageContainer } from "../../layouts/page-container";
import { connect } from "react-redux";
import { paymentsOperations } from "../../../state/ducks/payments";
import * as GTM from "../../../state/utils/gtm";
import { StripeProvider } from "react-stripe-elements";
import { PaymentMethodsSection } from "../../containers/payment-methods-section";
import Maybe from "../../common/helpers/maybe";
import { STRIPE_SCRIPT_ID } from "constants/keys";

class PaymentMethodsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      stripe: null
    };
  }

  componentDidMount() {
    this.props.getContractToPay(this.props.contractReference);
    GTM.tagManagerDataLayer(
      "PAYMENT_METHODS_PAGE_VIEW",
      this.props.contractReference
    );
    this.setState({ isMounted: true });
    this.loadStripe();
  }

  loadStripe = () => {
    const stripeJs = document.createElement("script");
    stripeJs.src = "https://js.stripe.com/v3/";
    stripeJs.async = true;
    stripeJs.onload = this.setStripe;
    if (document.body) document.body.appendChild(stripeJs);
  };

  setStripe = () => {
    this.setState({
      stripe: window.Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
    });
  };

  render() {
    return (
      <PageContainer
        applyFetchCelebrities={false}
        showSearch={false}
        showNavbarButtons={false}
        showSearchWeb={false}
        showInputSearchSm={false}
        showLogin={false}
        showFooter={false}
        hideControls={true}
        showBotMakerFrame
      >
        <Maybe it={this.state.isMounted}>
          <StripeProvider stripe={this.state.stripe}>
            <PaymentMethodsSection contractData={this.props.contract} />
          </StripeProvider>
        </Maybe>
      </PageContainer>
    );
  }
}

// Set propTypes
PaymentMethodsPage.propTypes = {};

// Set defaultProps
PaymentMethodsPage.defaultProps = {
  contract: {}
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.payments.getContractToPayReducer.loading,
  isCompleted: state.payments.getContractToPayReducer.completed,
  contract: state.payments.getContractToPayReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  getContractToPay: paymentsOperations.getContractToPay
};

// Export Class
const _PaymentMethodsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethodsPage);

export { _PaymentMethodsPage as PaymentMethodsPage };
