import React, { Component } from "react";
import { PageContainer } from "../../layouts/page-container";
import { connect } from "react-redux";
import { paymentsOperations } from "../../../state/ducks/payments";
import * as GTM from "../../../state/utils/gtm";
import { StripeProvider } from "react-stripe-elements";
import { PaymentMethodsSection } from "../../containers/payment-methods-section";
import Maybe from "../../common/helpers/maybe";

class PaymentMethodsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false
    };
  }

  componentDidMount() {
    this.props.getContractToPay(this.props.contractReference);
    // GTM.tagManagerDataLayer("PAYMENT_METHODS_PAGE_VIEW", this.props.match);
    this.setState({ isMounted: true });
  }

  render() {
    console.log("CONTRACT:", this.props);
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
          <StripeProvider apiKey={process.env.NEXT_PUBLIC_STRIPE_KEY}>
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
